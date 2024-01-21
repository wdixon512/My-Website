import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextApiRequest,
  Redirect,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "./api/auth/[...nextauth]";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

interface ISignInProps {
  providers: Record<string, any>;
  redirect?: Redirect;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ISignInProps>> {
  const session = await getServerSession(
    context.req,
    context.res,
    getAuthOptions(context.req as NextApiRequest)
  );

  // If the user is already logged in, redirect.
  if (session) {
    return { redirect: { permanent: false, destination: "/stats" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction="column"
      pt={20}
    >
      <Heading mb={4}>Welcome to GamerStats</Heading>
      <Text mb={8}>Sign in to view your gaming stats and achievements.</Text>
      <VStack spacing={4}>
        {Object.values(providers).map((provider) =>
          provider.name === "Steam" ? (
            <Button
              key={provider.name}
              onClick={() => signIn(provider.id)}
              colorScheme="orange"
              size="lg"
              leftIcon={
                <Image
                  src="/static/images/steam-logo.png"
                  alt="steam icon"
                  width={36}
                  height={36}
                />
              } // Replace with your local Steam icon image path
            >
              Sign in with {provider.name}
            </Button>
          ) : null
        )}
      </VStack>
    </Flex>
  );
}
