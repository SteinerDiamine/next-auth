import { getVerificationTokenByEmail } from '@/data/verification';
import {v4 as uuidv4} from 'uuid';
import { db } from '@/lib/db';

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


