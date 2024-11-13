"use client";

import { FC } from "react";
import MyButton from "./Button";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface AuthButonsProps {
  providers: any;
}

const AuthButons: FC<AuthButonsProps> = ({ providers }) => {
  return (
    <div className="flex flex-col space-y-3 mt-10">
      <MyButton onClick={() => signIn(providers?.google.id)}>
        <FaGoogle size={22} />
        Continue with Google
      </MyButton>

      <MyButton onClick={() => signIn(providers?.github.id)}>
        <FaGithub size={22} />
        Continue with Github
      </MyButton>
    </div>
  );
};
export default AuthButons;
