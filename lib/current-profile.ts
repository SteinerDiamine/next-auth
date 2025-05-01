import { auth } from "@/auth";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  const session = await auth();

  if (!session?.user?.id) return null;

  // Find profile by userId (which matches User.id)
  const profile = await db.profile.findFirst({
    where: {
      userId: session.user.id
    }
   
    
  });

  return profile;
};