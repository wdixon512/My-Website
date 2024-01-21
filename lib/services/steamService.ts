import {
  PlayerSummariesResponse,
  PlayerSummary,
} from "@lib/models/steam/PlayerSummary";
import { steamEndpoints } from "@lib/steam-endpoints";
import { Session } from "next-auth";

function checkForErrors(response: Response): void {
  if (!response.ok) {
    throw new Error(
      `An error occurred: ${response.status} ${response.statusText}`
    );
  }
}

export function checkSession(session: Session) {
  if (!session) {
    return {
      redirect: {
        destination: "/steam-login", // Adjust this path if your sign-in route is different
        permanent: false, // This redirect is not permanent
      },
    };
  }
}

export async function fetchPlayerAchievements(
  steamId: string,
  appId: string
): Promise<PlayerAchievement[]> {
  console.log(steamEndpoints.getPlayerAchievements(steamId, appId));
  const res = await fetch(steamEndpoints.getPlayerAchievements(steamId, appId));

  checkForErrors(res);

  const data: PlayerAchievementsResponse = await res.json();

  return data.playerstats.achievements;
}

export async function fetchPlayerOwnedGames(steamId: string): Promise<Game[]> {
  const res = await fetch(steamEndpoints.getPlayerOwnedGames(steamId));

  checkForErrors(res);

  const data: OwnedGamesResponse = await res.json();

  // Assuming the Steam API returns an empty array or null if there are no games
  return data.response.games || [];
}

export async function fetchPlayerOwnedGamesWithAchievements(
  steamId: string
): Promise<Game[]> {
  const games = await fetchPlayerOwnedGames(steamId);

  const gamesWithAchievements = await Promise.all(
    games.map(async (game) => {
      const achievements = await fetchPlayerAchievements(
        steamId,
        game.appid.toString()
      );

      return {
        ...game,
        achievements,
      };
    })
  );

  return gamesWithAchievements;
}

export async function fetchPlayerSummaries(
  steamId: string
): Promise<PlayerSummary> {
  const res = await fetch(steamEndpoints.getPlayerSummaries(steamId));

  checkForErrors(res);

  const data: PlayerSummariesResponse = await res.json();

  if (data.response.players.length === 0) {
    throw new Error("No player summary found");
  }

  return data.response.players[0];
}
