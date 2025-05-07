import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";

const f = createUploadthing();

// const handleAuth = () => {
//     const {userId} = auth();
//      if (!userId) 
//         throw new Error("Unauthorized");
//         return {userId: userId};
          
// }

const handleAuth = async () => {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }
    return { userId: session.user.id };
};

export const ourFileRouter = {
  
    serverImage: f({image: { maxFileSize: "4MB", maxFileCount: 1}})
    .middleware(handleAuth).onUploadComplete(() => {}),

    messageFile: f(["image", "pdf"])
    .middleware(handleAuth).onUploadComplete(() => {})
    
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
