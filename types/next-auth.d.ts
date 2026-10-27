import { type DefaultSession } from "next-auth";

/** Shape of Steam profile on the session (avoids importing next-auth-steam types into the client). */
export interface SteamProfile {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
  commentpermission?: boolean;
  realname?: string;
  loccountrycode?: string;
}

declare module "next-auth" {
  interface Session {
    user?: {
      steam: SteamProfile;
    } & DefaultSession["user"];
  }
}
