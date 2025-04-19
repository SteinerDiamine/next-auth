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
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function LoginFormDemo() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" 
    ? "Email already in use with different provider" 
    : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            reset();
            setError(data.error);
          }

          if (data?.success) {
            reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }  
        })
        .catch(() => {
          setError("Something went wrong, please try again later.");
        });
    });
  };

  const providers: [string, React.ElementType][] = [
    ["GitHub", IconBrandGithub],
    ["Google", IconBrandGoogle],
  ];

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-xl border border-zinc-700 bg-black p-4 text-white md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-200 text-center">Welcome back!</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-400 text-center">
        Login to continue your wonderful journey
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {showTwoFactor ? (
            <LabelInputContainer>
              <Label htmlFor="code" className="text-neutral-300">Two Factor Code</Label>
              <Input
                id="code"
                disabled={isPending}
                placeholder="123456"
                className="bg-zinc-900 border border-zinc-700 focus:border-cyan-500 focus:ring-cyan-500 text-white transition-all duration-200"
                {...formRegister("code")}
              />
              {errors.code && (
                <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
              )}
            </LabelInputContainer>
          ) : (
            <>
              <LabelInputContainer>
                <Label htmlFor="email" className="text-neutral-300">Email Address</Label>
                <Input
                  id="email"
                  disabled={isPending}
                  placeholder="diamine123@gmail.com"
                  type="email"
                  className="bg-zinc-900 border border-zinc-700 focus:border-cyan-500 focus:ring-cyan-500 text-white transition-all duration-200"
                  {...formRegister("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="password" className="text-neutral-300">Password</Label>
                <Input
                  id="password"
                  disabled={isPending}
                  placeholder="••••••••"
                  type="password"
                  className="bg-zinc-900 border border-zinc-700 focus:border-cyan-500 focus:ring-cyan-500 text-white transition-all duration-200"
                  {...formRegister("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
                <Link 
                  href="/auth/reset" 
                  className="text-sm text-neutral-400 hover:text-cyan-500 transition text-center mt-1"
                >
                  Forgot password?
                </Link>
              </LabelInputContainer>
            </>
          )}
        </div>

        {(error || urlError) && (
          <p className="text-red-500 text-sm mt-4 text-center">{error || urlError}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mt-4 text-center">{success}</p>
        )}

        <button
          disabled={isPending}
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-zinc-900 to-zinc-700 font-medium text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] border border-zinc-700 hover:border-cyan-500 transition disabled:opacity-70 mt-6 cursor-pointer"
          type="submit"
        >
          {showTwoFactor ? "Confirm" : "Login"} &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

        <div className="flex flex-col space-y-4">
          {providers.map(([name, Icon], i) => (
            <button
              key={i}
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-zinc-900 px-4 font-medium text-white border border-zinc-700 hover:border-cyan-500 transition cursor-pointer"
              type="button"
            >
              <Icon className="h-4 w-4 text-neutral-300" />
              <span className="text-sm text-neutral-300">Continue with {name}</span>
              <BottomGradient />
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-neutral-400 mt-4">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-cyan-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
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
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

