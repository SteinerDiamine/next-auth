import { getVerificationTokenByEmail } from '@/data/verification';
import {v4 as uuidv4} from 'uuid';
import { db } from '@/lib/db';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import crypto from 'crypto';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1000_000).toString();

    const expires = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes from now


    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
        await db.twoFactorToken.delete({
            where: { id: existingToken.id },
        });
    }


    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            token,
            email,
            expires,
        },
    });

    return twoFactorToken;

}

    


export const generateVerificationToken = async (email: string) =>
    {
        const token = uuidv4();
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        const existingToken = await getPasswordResetTokenByEmail(email);

        if (existingToken) {
            await db.passwordResetToken.delete({
                where: { id: existingToken.id },
            });
        }

        const passwordResetToken = await db.passwordResetToken.create({
            data: {
                token,
                email,
                expires,
            },
        });
        return passwordResetToken;
}



export const genrateVerificationToken = async (email: string) => {
const token = uuidv4();

const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

const existingToken = await  getVerificationTokenByEmail(email);

if (existingToken){
    await db.verificationToken.delete({
        where: { id: existingToken.id},
    });
}

const verificationToken = await db.verificationToken.create({
    data: {
        token,
        email,
        expires,
    },
});
return verificationToken;
}


