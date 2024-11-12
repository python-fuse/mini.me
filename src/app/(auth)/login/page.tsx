"use client";

import logo from "@/assets/logo.png";
import MyButton from "@/src/components/Button";
import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const page = () => {
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
        </div>
      </div>

      <div className="flex-1 h-screen bg-tertiary"></div>
    </div>
  );
};
export default page;
