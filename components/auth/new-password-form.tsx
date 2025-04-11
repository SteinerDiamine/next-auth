'use client';
import * as z from 'zod';
import { NewPasswordSchema } from '@/schemas';
import CardWrapper from './card-wrapper';
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
// import { login } from '@/actions/login';
// import { reset } from '@/actions/reset';
import { newPassword } from '@/actions/new-password';


export const NewPasswordForm = ()  => {

    
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
           
        }
    });

  

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {

        console.log(values);
        startTransition(() => {
            newPassword(values, token)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })

        });
    }
        
    

    
    return (
        <CardWrapper
         headerLabel="Enter a new password!"
         backButtonLabel="Back to login"
         backButtonHref="/auth/login"
         
        >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='space-y-4'>
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
                           
                            <FormMessage/>
                        </FormItem>
                    )}
                     />

             
                </div>

                <FormError message={error}/>
                <FormSucess message={success}/>
                <Button disabled={isPending} type="submit" size="lg" className='w-full ' >
                    Reset password
                </Button>
            </form>
        </Form>
        </CardWrapper>
    )
}




