interface PlayerAchievement {
  apiname: string;
  achieved: number;
  unlocktime: number;
  name?: string; // Optional, based on what the API returns
  description?: string; // Optional, based on what the API returns
}

interface PlayerAchievementsResponse {
  playerstats: {
    steamID: string;
    gameName: string;
    achievements: PlayerAchievement[];
    success: boolean;
  };
}
