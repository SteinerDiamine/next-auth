'use server';
import { z } from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import {genrateVerificationToken} from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';


export const register = async (values: any) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields"}; 
    }

    const { name, email, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

   
    const existingUser = await getUserByEmail(email);

    if (existingUser){
        return { error: "User already exists"}
    }


    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    const verificationToken = await genrateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);


    return { success: "Confirmation email sent!" };

    

    
}