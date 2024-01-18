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
import { Box, Button, Flex } from "@chakra-ui/react";

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
    <Flex justifyContent="center" h="100vh" alignItems="center">
      {Object.values(providers).map((provider) => (
        <Button onClick={() => signIn(provider.id)} colorScheme="orange">
          Sign in with {provider.name}
        </Button>
      ))}
    </Flex>
  );
}
