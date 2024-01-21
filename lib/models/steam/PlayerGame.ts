interface Game {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url?: string;
  img_logo_url?: string;
  has_community_visible_stats?: boolean;
  playtime_windows_forever?: number;
  playtime_mac_forever?: number;
  playtime_linux_forever?: number;
  achievements?: PlayerAchievement[];
}

// Define the structure of the response from the GetOwnedGames Steam API endpoint
interface OwnedGamesResponse {
  response: {
    game_count: number;
    games: Game[];
  };
}
