import { type DefaultSession } from "next-auth";
import { SteamProfile } from "next-auth-steam";

declare module "next-auth" {
  interface Session {
    user?: {
      steam: SteamProfile;
    } & DefaultSession["user"];
  }
}
