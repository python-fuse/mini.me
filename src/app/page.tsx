import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";

const page = async () => {
  const session = await getServerSession();

  if (session) {
    return (
      <div>
        Signed in as {session.user!.name} <br />
        {/* <button onClick={() => signOut()}>Sign out</button> */}
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
