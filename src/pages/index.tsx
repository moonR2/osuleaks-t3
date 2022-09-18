import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const {data: session, status} = useSession();
  console.log("SESSION", session);
  console.log("STATUS", status);
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  if (status === "loading") {
    return <main>Loading...</main>
  }

  return (
    <main>
      <h1>Osu Leaks</h1>
      {session ? (
      <div>
      <p>Hi {session.user?.name}</p>
      <button onClick={() => signOut()}>
      Logout
      </button>
      </div>
      ) : (
      <button onClick={() => signIn("osu")} >
        Login with Osu! 
      </button>
      )}

    </main>
  );
};

export default Home;
