

// "use client";
// import React from "react";
// import { Label } from "@/components/ui/labelone";
// import { Input } from "@/components/ui/inputone";
// import { cn } from "@/lib/utils";
// import {
//   IconBrandGithub,
//   IconBrandGoogle,
// } from "@tabler/icons-react";
// import * as z from "zod";
// import { useState, useTransition } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { RegisterSchema } from "@/schemas";
// import { register } from "@/actions/register";

// export default function SignupFormDemo() {
//   const [error, setError] = useState<string | undefined>("");
//   const [success, setSuccess] = useState<string | undefined>("");
//   const [isPending, startTransition] = useTransition();

//   const {
//     register: formRegister,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<z.infer<typeof RegisterSchema>>({
//     resolver: zodResolver(RegisterSchema),
//     defaultValues: { email: "", password: "", name: "" },
//   });

//   const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
//     setError("");
//     setSuccess("");
//     startTransition(() => {
//       register(values).then((data) => {
//         if (data.error) setError(data.error);
//         else if (data.success) setSuccess(data.success);
//       });
//     });
//   };

//   const providers: [string, React.ElementType][] = [
//     ["GitHub", IconBrandGithub],
//     ["Google", IconBrandGoogle],
//   ];

//   return (
//     <div className="border-zinc-700 shadow-input mx-auto w-full max-w-md  rounded-none bg-black p-4 text-white md:rounded-2xl md:p-8">
//       <h2 className="text-xl font-bold text-neutral-200 text-center">Welcome to auth</h2>
//       <p className="mt-2 max-w-sm text-sm text-neutral-400 text-center">
//         Signup to the application to begin your wonderful journey
//       </p>

//       <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
//         <div className="space-y-4">
//           {/* Name Field */}
//           <LabelInputContainer>
//             <Label htmlFor="name" className="text-neutral-300">Name</Label>
//             <Input
//               id="name"
//               disabled={isPending}
//               placeholder="diamine"
//               type="text"
//               className="bg-zinc-900 border border-zinc-700 text-white"
//               {...formRegister("name")}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//             )}
//           </LabelInputContainer>

//           {/* Email Field */}
//           <LabelInputContainer>
//             <Label htmlFor="email" className="text-neutral-300">Email Address</Label>
//             <Input
//               id="email"
//               disabled={isPending}
//               placeholder="diamine123@gmail.com"
//               type="email"
//               className="bg-zinc-900 border border-zinc-700 text-white"
//               {...formRegister("email")}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </LabelInputContainer>

//           {/* Password Field */}
//           <LabelInputContainer>
//             <Label htmlFor="password" className="text-neutral-300">Password</Label>
//             <Input
//               id="password"
//               disabled={isPending}
//               placeholder="••••••••"
//               type="password"
//               className="bg-zinc-900 border border-zinc-700 text-white"
//               {...formRegister("password")}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </LabelInputContainer>
//         </div>

//         {/* Error and Success Messages */}
//         {error && (
//           <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
//         )}
//         {success && (
//           <p className="text-green-500 text-sm mt-4 text-center">{success}</p>
//         )}

//         {/* Submit Button */}
//         <button
//           disabled={isPending}
//           className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-zinc-900 to-zinc-700 font-medium text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-70 mt-6"
//           type="submit"
//         >
//           Sign up &rarr;
//           <BottomGradient />
//         </button>

//         <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

//         {/* Social Login Buttons */}
//         <div className="flex flex-col space-y-4">
//           {providers.map(([name, Icon], i) => (
//             <button
//               key={i}
//               className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-zinc-900 px-4 font-medium text-white border border-zinc-700"
//               type="button"
//             >
//               <Icon className="h-4 w-4 text-neutral-300" />
//               <span className="text-sm text-neutral-300">Continue with {name}</span>
//               <BottomGradient />
//             </button>
//           ))}
//         </div>
//       </form>
//     </div>
//   );
// }

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
//       <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
//     </>
//   );
// };

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={cn("flex w-full flex-col space-y-2", className)}>
//       {children}
//     </div>
//   );
// };

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

export default function SignupFormDemo() {
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

  const providers: [string, React.ElementType][] = [
    ["GitHub", IconBrandGithub],
    ["Google", IconBrandGoogle],
  ];

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-xl border border-zinc-700 bg-black p-4 text-white md:rounded-2xl md:p-8 "> {/* border added */}
      <h2 className="text-4xl font-bold text-neutral-200 text-center ">Welcome to connect</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-400 text-center ">
        register to begin with our application
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Name Field */}
          <LabelInputContainer>
            <Label htmlFor="name" className="text-neutral-300">Name</Label>
            <Input
              id="name"
              disabled={isPending}
              placeholder="diamine"
              type="text"
              className="bg-zinc-900 border border-zinc-700 focus:border-cyan-500 focus:ring-cyan-500 text-white transition-all duration-200" // border highlight
              {...formRegister("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </LabelInputContainer>

          {/* Email Field */}
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

          {/* Password Field */}
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
          </LabelInputContainer>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mt-4 text-center">{success}</p>
        )}

        <button
          disabled={isPending}
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-zinc-900 to-zinc-700 font-medium text-white shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] border border-zinc-700 hover:border-cyan-500 transition disabled:opacity-70 mt-6"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

        <div className="flex flex-col space-y-4">
          {providers.map(([name, Icon], i) => (
            <button
              key={i}
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-zinc-900 px-4 font-medium text-white border border-zinc-700 hover:border-cyan-500 transition"
              type="button"
            >
              <Icon className="h-4 w-4 text-neutral-300" />
              <span className="text-sm text-neutral-300">Continue with {name}</span>
              <BottomGradient />
            </button>
          ))}
        </div>
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







