
"use client";
import React from "react";
import { Label } from "@/components/ui/labelone";
import { Input } from "@/components/ui/inputone";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import * as z from "zod";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        if (data.error) setError(data.error);
        else if (data.success) setSuccess(data.success);
      });
    });
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  const providers = [
    {
      name: "Google",
      icon: IconBrandGoogle,
      provider: "google",
      className: "hover:bg-red-500/10"
    },
    {
      name: "GitHub",
      icon: IconBrandGithub,
      provider: "github",
      className: "hover:bg-gray-500/10"
    }
  ];

  return (
    <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center p-4">
      <div className="mx-auto w-full max-w-md rounded-lg border border-zinc-800 bg-black p-4 text-white shadow-lg shadow-zinc-950/50 md:rounded-xl md:p-8">
        {/* <h2 className="text-2xl font-bold text-neutral-100 text-center md:text-3xl">
          Welcome to Connect
        </h2>
        <p className="mt-2 text-sm text-neutral-400 text-center md:text-base">
          Register to begin with our application
        </p> */}

        <div className="flex items-center justify-center gap-3">
          <Image 
            src="/lego.png" 
            alt="Connect Logo"
            width={80}
            height={80}
            className="" 
            unoptimized
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-100 md:text-3xl">
              Welcome! 
            </h2>
            <p className="text-sm text-neutral-400 md:text-base text-center">
              SignUp to continue your journey
            </p>
          </div>
        </div>

        <form className="my-6 md:my-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3 md:space-y-4">
            {/* Name Field */}
            <LabelInputContainer>
              <Label htmlFor="name" className="text-neutral-300 text-sm md:text-base">
                Name
              </Label>
              <Input
                id="name"
                disabled={isPending}
                placeholder="diamine"
                type="text"
                className="bg-zinc-950 border border-zinc-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 text-white transition-all duration-200 text-sm md:text-base h-10 md:h-11 rounded-lg"
                {...formRegister("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{errors.name.message}</p>
              )}
            </LabelInputContainer>

            {/* Email Field */}
            <LabelInputContainer>
              <Label htmlFor="email" className="text-neutral-300 text-sm md:text-base">
                Email Address
              </Label>
              <Input
                id="email"
                disabled={isPending}
                placeholder="diamine123@gmail.com"
                type="email"
                className="bg-zinc-950 border border-zinc-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 text-white transition-all duration-200 text-sm md:text-base h-10 md:h-11 rounded-lg"
                {...formRegister("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email.message}</p>
              )}
            </LabelInputContainer>

            {/* Password Field */}
            <LabelInputContainer>
              <Label htmlFor="password" className="text-neutral-300 text-sm md:text-base">
                Password
              </Label>
              <Input
                id="password"
                disabled={isPending}
                placeholder="••••••••"
                type="password"
                className="bg-zinc-950 border border-zinc-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 text-white transition-all duration-200 text-sm md:text-base h-10 md:h-11 rounded-lg"
                {...formRegister("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{errors.password.message}</p>
              )}
            </LabelInputContainer>
          </div>

          {error && (
            <p className="text-red-500 text-xs md:text-sm mt-3 md:mt-4 text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-xs md:text-sm mt-3 md:mt-4 text-center">{success}</p>
          )}

          <button
            disabled={isPending}
            className="group/btn relative block h-10 w-full rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-800 font-medium text-white border border-zinc-800 hover:border-cyan-500 hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] transition-all duration-300 disabled:opacity-70 mt-4 md:mt-6 hover:from-zinc-800 hover:to-zinc-700 active:scale-[0.98] cursor-pointer"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="text-center mt-4 text-sm text-neutral-400">
            Already have an account?{" "}
            <Link 
              href="/auth/login" 
              className="text-cyan-500 hover:to-blue-900 hover:underline transition-colors"
            >
              Login here
            </Link>
          </div>

          <div className="mx-auto my-6 h-[1px] w-[calc(100%-2rem)] bg-gradient-to-r from-transparent via-zinc-800 to-transparent md:my-8" />

          <div className="flex flex-col space-y-3 md:space-y-4">
            {providers.map(({ name, icon: Icon, provider, className }) => (
              <button
                key={provider}
                onClick={() => handleSocialLogin(provider as "google" | "github")}
                className={`group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-lg bg-zinc-950 px-4 font-medium text-white border border-zinc-800 cursor-pointer hover:border-cyan-500 transition-all duration-300 active:scale-[0.98] ${className}`}
                type="button"
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm">
                  Continue with {name}
                </span>
                <BottomGradient />
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-1 md:space-y-2", className)}>
      {children}
    </div>
  );
};