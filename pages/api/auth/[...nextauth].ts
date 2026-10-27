import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import SteamProvider, { PROVIDER_ID } from "next-auth-steam";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, getAuthOptions(req));
}

export function getAuthOptions(req: NextApiRequest): AuthOptions {
  return {
    providers: [
      SteamProvider(req, {
        // next-auth-steam 0.1.x typings drop clientSecret from SteamProviderOptions
        // even though the runtime provider still reads provider.clientSecret.
        clientSecret: process.env.STEAM_API_KEY!,
        callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL!,
      } as Parameters<typeof SteamProvider>[1]),
    ],
    callbacks: {
      jwt({ token, account, profile }) {
        if (account?.provider === PROVIDER_ID) {
          token.steam = profile;
        }

        return token;
      },
      session({ session, token }) {
        if ("steam" in token) {
          // @ts-expect-error
          session.user.steam = token.steam;
        }

        return session;
      },
    },
    pages: {
      signIn: "/steam-login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
}
