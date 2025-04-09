'use client';
import * as z from 'zod';
import { ResetSchema} from '@/schemas';
import { CardWrapper } from "./card-wrapper";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


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
import { reset } from '@/actions/reset';


export const ResetForm = ()  => {

    
   

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

        console.log(values);
        startTransition(() => {
            reset(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })

        });
    }
        
    

    
    return (
        <CardWrapper
         headerLabel="Forgot your password?"
         backButtonLabel="Back to login"
         backButtonHref="/auth/login"
         
        >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='space-y-4'>
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

                {/* <FormField 
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
                     /> */}
                </div>

                <FormError message={error}/>
                <FormSucess message={success}/>
                <Button disabled={isPending} type="submit" size="lg" className='w-full ' >
                    Send reset email
                </Button>
            </form>
        </Form>
        </CardWrapper>
    )
}




