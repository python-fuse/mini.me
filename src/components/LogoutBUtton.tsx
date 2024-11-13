"use client";

import MyButton from "./Button";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const LogoutBUtton = () => {
  return (
    <MyButton
      onClick={() => {
        signOut({
          callbackUrl: "/login",
        });
      }}
    >
      Logout
    </MyButton>
  );
};
export default LogoutBUtton;
