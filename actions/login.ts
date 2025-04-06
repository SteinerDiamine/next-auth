'use server';

import { LoginSchema } from '@/schemas';
import { signIn } from '../auth'; // adjust relative path as needed

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';


export const login = async (values: any) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields"};
    }
    const {email, password} = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Invalid credentials!"}
                default: 
                    return {error: "Something went wrong!"}
            }
        }
        
    }
}


