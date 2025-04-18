// "use server"

// import * as z from "zod";

// import { db } from "@/lib/db";
// import {SettingsSchema} from "@/schemas";
// import { getUserByEmail, getUserById } from "@/data/user";
// import { currentUser } from "@/lib/auth";
// import { generateVerificationToken } from "@/lib/token";
// import { sendVerificationEmail } from "@/lib/mail";
// import bcrypt from "bcryptjs";

// export const settings = async (
//     values: z.infer<typeof SettingsSchema>
// ) => {
//     const user = await currentUser();

//     if(!user) {
//         return {error: "Unauthorized"}
//     }
//   //@ts-ignore
//     const dbUser = await getUserById(user.id);

//     if(!dbUser) {
//         return { error: "Unauthorized"};
//     }

//     if(user.isOAuth){
//         values.email = undefined;
//         values.password = undefined;
//         values.newPassword = undefined;
//         values.isTwoFactorEnabled = undefined;
//     }

//     if(values.email && values.email !== user.email){
//         const existingUser = await getUserByEmail(values.email);

//         if(existingUser && existingUser.id !== user.id){
//             return {error: "Email already in use"}
//         }

//         const verificationToken = await generateVerificationToken(
//             values.email,
//         );
//         await sendVerificationEmail(
//             verificationToken.email,
//             verificationToken.token,
//         );

//         return {success: "Verification email sent"};
//     }

//     if(values.password && values.newPassword && dbUser.password){
//         const passwordMatch = await  bcrypt.compare(
//             values.password,
//             dbUser.password,
//         );

//         if(!passwordMatch){
//             return {error: "Invalid password"}
//         }

//         const hashedPassword = await bcrypt.hash(
//             values.newPassword,
//             10,
//         );
//         values.password = hashedPassword;
//         values.newPassword = undefined;
//     }


//     await db.user.update({
//         where: {
//             id: dbUser.id
//         },
//         data: {
//             ...values,
//         }
//     });
//     return { success: "Settings updated" };



// }









'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { auth } from '@/auth'; // Import the new `auth()` function
import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';

import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/token';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Verification email sent!' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) {
      return { error: 'Incorrect password!' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  // Custom session update logic using `auth()`
  const session = await auth();
  if (session && session.user) {
    session.user = {
      ...session.user,
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    };
  }

  return { success: 'Settings Updated!' };
};











