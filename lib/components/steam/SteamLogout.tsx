import { Button } from "@chakra-ui/react";
import { getProviders, signOut, useSession } from "next-auth/react";
import React from "react";

export const SteamLogout: React.FC = () => {
  const { status } = useSession();

  const authenticated = status === "authenticated";

  return (
    <>
      {authenticated && (<Button colorScheme="blue" fontFamily="Pixel" onClick={() => signOut()}>Logout</Button>)}
    </>
  );
};

export default SteamLogout;
