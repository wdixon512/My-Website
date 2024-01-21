export const steamEndpoints = {
  getPlayerSummaries(steamId: string): string {
    return `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`;
  },
  getPlayerAchievements(steamId: string, appId: string): string {
    return `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${process.env.STEAM_API_KEY}&steamid=${steamId}`;
  },
  getPlayerOwnedGames(steamId: string): string {
    return `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&format=json`;
  },
};

export default steamEndpoints;
