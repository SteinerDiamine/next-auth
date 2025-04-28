// 'use client';
// import * as z from 'zod';
// import { ResetSchema} from '@/schemas';

// import {useForm} from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod";


// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage

// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { FormError } from '@/components/form-error';
// import { FormSucess } from '@/components/form-success';

// import { useState, useTransition } from 'react';
// // import { login } from '@/actions/login';
// import { reset } from '@/actions/reset';
// import CardWrapper from './card-wrapper';


// export const ResetForm = ()  => {

    
   

//     const [error, setError] = useState<string | undefined>("");
//     const [success, setSuccess] = useState<string | undefined>("");

//     const [isPending, startTransition] = useTransition();

//     const form = useForm<z.infer<typeof ResetSchema>>({
//         resolver: zodResolver(ResetSchema),
//         defaultValues: {
//             email: "",
           
//         }
//     });

  

//     const onSubmit = (values: z.infer<typeof ResetSchema>) => {

//         console.log(values);
//         startTransition(() => {
//             reset(values)
//             .then((data) => {
//                 setError(data?.error);
//                 setSuccess(data?.success);
//             })

//         });
//     }
        
    

    
//     return (
//         <CardWrapper
//          headerLabel="Forgot your password?"
//          backButtonLabel="Back to login"
//          backButtonHref="/auth/login"
         
//         >
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
//                 <div className='space-y-4'>
//                  <FormField 
//                     control={form.control}
//                     name="email"
//                     render= {({field}) => (
//                         <FormItem>
//                             <FormLabel>Email</FormLabel>
//                             <FormControl>
//                                 <Input
//                                 {...field}
//                                 disabled={isPending}
//                                 placeholder="diamine123@gmail.com"
//                                 type="email"
//                                 />
//                             </FormControl>
                           
//                             <FormMessage/>
//                         </FormItem>
//                     )}
//                      />

             
//                 </div>

//                 <FormError message={error}/>
//                 <FormSucess message={success}/>
//                 <Button disabled={isPending} type="submit" size="lg" className='w-full ' >
//                     Send reset email
//                 </Button>
//             </form>
//         </Form>
//         </CardWrapper>
//     )
// }








'use client';
import * as z from 'zod';
import { ResetSchema } from '@/schemas';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from 'react';
import { reset } from '@/actions/reset';
import Link from 'next/link';
import Image from 'next/image';

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md space-y-8 p-8 rounded-xl bg-gray-900 border border-gray-800 shadow-2xl shadow-gray-950/50">
        <div className="flex flex-col items-center">
         
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your email to receive a reset link
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  disabled={isPending}
                  placeholder="your@email.com"
                  className="block w-full rounded-lg border border-gray-800 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition duration-200"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-900/30 p-3 border border-red-800">
              <p className="text-sm text-red-400 text-center">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-900/30 p-3 border border-green-800">
              <p className="text-sm text-green-400 text-center">{success}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full justify-center rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-medium text-white hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              {isPending ? 'Sending...' : 'Send reset email'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-400">
          Remember your password?{' '}
          <Link 
            href="/auth/login" 
            className="font-medium text-cyan-500 hover:text-cyan-400 hover:underline transition-colors"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};