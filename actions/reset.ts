"use server"

import { z } from "zod";


import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user";


import { generateVerificationToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";





export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedSchema = ResetSchema.safeParse(values);

    if (!validatedSchema.success) {
        return { error: "Invalid email" };
    }

    const {email} = validatedSchema.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser) {
        return { error: "User not found" };
    }

    const passwordResetToken = await generateVerificationToken(email);

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    )

    return { success: "Reset link sent to your email" };
}

