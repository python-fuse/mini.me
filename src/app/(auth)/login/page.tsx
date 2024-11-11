"use client";

import logo from "@/assets/logo.png";
import MyButton from "@/src/components/Button";
import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex w-screen">
      <div className="w-3/5 bg-white h-screen overflow-y-auto pb-10 flex flex-col gap-y-4">
        <Image src={logo} alt="Mini.me" />

        {/* Login text and signup */}
        <div className="px-28 flex flex-col gap-y-3">
          <div className="space-y-1">
            <p className="text-3xl font-bold">Login to continue</p>
            <p className="text-black/80">
              Don&apos;t have an account?{" "}
              <Link
                href={"/signup"}
                className="text-primary-300 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Auth providers */}
          <div className="flex flex-col space-y-3">
            <MyButton className="normal-case bg-primary-300 p-3">
              <FaGoogle size={22} />
              Continue with Google
            </MyButton>

            <MyButton className="normal-case  bg-primary-300 p-3">
              <FaGithub size={22} />
              Continue with Github
            </MyButton>
          </div>

          <h3 className="text-center">OR</h3>

          <form className="flex flex-col gap-y-3" onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              variant="outlined"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link
              href={"/reset_password"}
              className="text-primary-400 text-end hover:underline"
            >
              Forgot your password?
            </Link>
            <MyButton className="normal-case  bg-primary-300 p-3">
              Login
            </MyButton>
          </form>
        </div>
      </div>

      <div className="flex-1 h-screen bg-tertiary"></div>
    </div>
  );
};
export default page;
