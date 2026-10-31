import { TTL_SECONDS } from "./types";

type RedisResult = string | number | null | (string | number)[];

export type KvCommand = (string | number)[];

type MemoryEntry =
  | { kind: "string"; value: string; expiresAt?: number }
  | { kind: "hash"; value: Map<string, number>; expiresAt?: number }
  | { kind: "hll"; value: Set<string>; expiresAt?: number };

const memory = new Map<string, MemoryEntry>();

function redisEnv(): { url: string; token: string } | null {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    "";
  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    "";
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

export function hasRedis(): boolean {
  return redisEnv() !== null;
}

function touchExpire(entry: MemoryEntry, ttlSec: number) {
  entry.expiresAt = Date.now() + ttlSec * 1000;
}

function getLive(key: string): MemoryEntry | undefined {
  const entry = memory.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt && entry.expiresAt <= Date.now()) {
    memory.delete(key);
    return undefined;
  }
  return entry;
}

function memExec(cmd: KvCommand): RedisResult {
  const op = String(cmd[0] || "").toUpperCase();
  const key = String(cmd[1] ?? "");

  if (op === "PFADD") {
    let entry = getLive(key);
    if (!entry || entry.kind !== "hll") {
      entry = { kind: "hll", value: new Set() };
      memory.set(key, entry);
    }
    const before = entry.value.size;
    for (let i = 2; i < cmd.length; i++) entry.value.add(String(cmd[i]));
    touchExpire(entry, TTL_SECONDS);
    return entry.value.size > before ? 1 : 0;
  }

  if (op === "PFCOUNT") {
    const entry = getLive(key);
    if (!entry || entry.kind !== "hll") return 0;
    return entry.value.size;
  }

  if (op === "INCR" || op === "INCRBY") {
    const by = op === "INCR" ? 1 : Number(cmd[2] || 1);
    let entry = getLive(key);
    if (!entry || entry.kind !== "string") {
      entry = { kind: "string", value: "0" };
      memory.set(key, entry);
    }
    const next = Number(entry.value || 0) + by;
    entry.value = String(next);
    touchExpire(entry, TTL_SECONDS);
    return next;
  }

  if (op === "GET") {
    const entry = getLive(key);
    if (!entry || entry.kind !== "string") return null;
    return entry.value;
  }

  if (op === "HINCRBY") {
    const field = String(cmd[2] ?? "");
    const by = Number(cmd[3] || 1);
    let entry = getLive(key);
    if (!entry || entry.kind !== "hash") {
      entry = { kind: "hash", value: new Map() };
      memory.set(key, entry);
    }
    const next = (entry.value.get(field) || 0) + by;
    entry.value.set(field, next);
    touchExpire(entry, TTL_SECONDS);
    return next;
  }

  if (op === "HGETALL") {
    const entry = getLive(key);
    if (!entry || entry.kind !== "hash") return [];
    const flat: (string | number)[] = [];
    for (const [k, v] of entry.value.entries()) {
      flat.push(k, v);
    }
    return flat;
  }

  if (op === "EXPIRE") {
    const entry = getLive(key);
    if (!entry) return 0;
    touchExpire(entry, Number(cmd[2] || TTL_SECONDS));
    return 1;
  }

  return null;
}

async function redisPipeline(commands: KvCommand[]): Promise<RedisResult[]> {
  const env = redisEnv();
  if (!env) {
    return commands.map((c) => memExec(c));
  }

  const res = await fetch(`${env.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upstash pipeline failed: ${res.status} ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as { result: RedisResult }[];
  return data.map((row) => row.result);
}

export async function pipeline(commands: KvCommand[]): Promise<RedisResult[]> {
  if (!commands.length) return [];
  return redisPipeline(commands);
}

export function hashToObject(flat: RedisResult): Record<string, number> {
  const out: Record<string, number> = {};
  if (!Array.isArray(flat)) return out;
  for (let i = 0; i + 1 < flat.length; i += 2) {
    out[String(flat[i])] = Number(flat[i + 1]) || 0;
  }
  return out;
}

/** Test helper — clear in-memory store. */
export function __resetMemoryStore() {
  memory.clear();
}
