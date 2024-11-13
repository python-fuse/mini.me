import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import LogoutBUtton from "../components/LogoutBUtton";

const page = async () => {
  const session = await getServerSession();

  if (session) {
    return (
      <div>
        Signed in as {session.user!.name} <br />
        {/* <button onClick={() => signOut()}>Sign out</button> */}
        <LogoutBUtton />
      </div>
    );
  } else {
    return (
      <div>
        Not signed in <br />
        {/* <button onClick={() => signIn()}>Sign in</button> */}
      </div>
    );
  }

  return <div className="">page</div>;
};
export default page;
