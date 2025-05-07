// import { currentUser } from "./auth"
// import {redirect} from "next/navigation"
// import { db } from "./db"

// export const intialProfile = async () => {
//     const user = await currentUser();

//     if(!user){
//         return redirect('/auth/login')
//     }

//     const profile = await db.profile.findUnique({
//         where:{
//             id: user.id
//         }
//     })


//     const newProfile = await db.profile.create({
//         data: {
                        
         
//         }
//     })
// }



import { currentUser } from "@/lib/auth"; // Assuming you wrapped getServerSession()
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) return redirect("/auth/login");

  const profile = await db.profile.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (profile) return profile;

  const name = user.name || user.email || user.id;

  if (!user?.id) {
    throw new Error("User ID is missing");
  }
  
  const newProfile = await db.profile.create({
    data: {
      userId: user.id, 
      name,
      email: user.email || "",
      ImageUrl: user.image || "",
    },
  });
  
  

  return newProfile;
};
