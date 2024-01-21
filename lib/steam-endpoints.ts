export const steamEndpoints = {
  getPlayerSummaries(steamId: string): string {
    return `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`;
  },
};

export default steamEndpoints;
