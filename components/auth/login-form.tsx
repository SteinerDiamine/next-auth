'use client';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useSearchParams } from 'next/navigation';


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage

} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSucess } from '@/components/form-success';

import { useState, useTransition } from 'react';
import { login } from '@/actions/login';
import Link from 'next/link';
import CardWrapper from './card-wrapper';


export const LoginForm = ()  => {

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : "";


    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
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
               if(data?.error){
                  form.reset();
                  setError(data.error);
               }

               if(data?.success){
                form.reset();
                setSuccess(data.success);
               }


                if(data?.twoFactor){
                    setShowTwoFactor(true);
                }  
            })
            .catch(() => {
                setError("Something went wrong, please try again later.");
            })

        });
    }
        
    

    
    return (
        <CardWrapper
         headerLabel="Welcome back!"
         backButtonLabel="Don't have an account?"
         backButtonHref="/auth/register"
         showSocial
        >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='space-y-4'>

                    {showTwoFactor && (

                        <FormField 
                        control={form.control}
                        name="code"
                        render= {({field}) => (
                            <FormItem>
                                <FormLabel>Two Factor Code</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="123456"
                                    />
                                </FormControl>
                            
                                <FormMessage/>
                            </FormItem>
                        )}
                        />

                    )}

               {!showTwoFactor && (
                 <>
                 <FormField 
                    control={form.control}
                    name="email"
                    render= {({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                disabled={isPending}
                                placeholder="diamine123@gmail.com"
                                type="email"
                                />
                            </FormControl>
                           
                            <FormMessage/>
                        </FormItem>
                    )}
                     />

                <FormField 
                    control={form.control}
                    name="password"
                    render= {({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                disabled={isPending}
                                placeholder="******"
                                type="password"
                                />
                            </FormControl>

                            <Button
                             size="sm"
                             variant="link"
                             asChild
                             className='px-0 font-normal text-sm text-muted-foreground hover:text-primary focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent'
                             >
                                <Link href = "/auth/reset">
                                Forgot password</Link>

                            </Button>
                            <FormMessage/>
                        </FormItem>
                    )}
                     />
                     </>
                     )
                }
                </div>
                <FormError message={error || urlError}/>
                <FormSucess message={success}/>
                <Button disabled={isPending} type="submit" size="lg" className='w-full' >
                    {showTwoFactor ? "Confirm" : "Login"}
                </Button>
            </form>
        </Form>
        </CardWrapper>
    )
}