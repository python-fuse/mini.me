import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import LogoutBUtton from "../components/LogoutBUtton";

const page = async () => {
  const session = await getServerSession();

  return <div className="">page</div>;
};
export default page;
