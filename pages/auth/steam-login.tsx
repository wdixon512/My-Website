import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextApiRequest,
  Redirect,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "../api/auth/[...nextauth]";

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

  console.log(session);

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
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}
