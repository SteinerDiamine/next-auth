
import { NextApiRequest } from "next";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const currentProfilePages = async (req: NextApiRequest) => {
  const session = await auth();

  if (!session?.user?.id) return null;

  const profile = await db.profile.findFirst({
    where: {
      userId: session.user.id
    }
   
    
  });

  return profile;
};