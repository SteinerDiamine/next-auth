

'use client'

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React from 'react';
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const onClick = (provider: "google" | "github") => {
  signIn(provider, {
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  })

}

const Social = () => {
  return (
    <div className="flex w-full items-center gap-x-3">
      <Button
        size="lg"
        className="w-[180px] bg-white text-black hover:bg-gray-100 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-200 transition-colors"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="text-xl" />
      </Button>

      <Button
        size="lg"
        className="w-[180px] bg-gray-900 text-white hover:bg-gray-700 border border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 transition-colors"
        onClick={() => onClick("github")}
      >
        <FaGithub className="text-xl" />
      </Button>
    </div>
  );
};

export default Social;
