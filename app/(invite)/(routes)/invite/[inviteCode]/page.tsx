// import { currentProfile } from "@/lib/current-profile"
// import { db } from "@/lib/db";
// import { redirect } from "next/navigation";

// interface InviteCodePageProps {
//     params: {
//         inviteCode: string
//     }
// }

// const InviteCodePage = async ({params} : InviteCodePageProps) => {
    
//   const profile = await currentProfile();
//   if(!profile) {
//     redirect("/auth/login")
//   }

//   if(!params.inviteCode) {
//     return redirect("/")
//   }

//   const existingServer = await db.server.findFirst({
//     where: {
//         inviteCode: params.inviteCode,
//         members: {
//             some: {
//                 id: profile.id
//             }
//         }
//     }
//   })

//   if(existingServer) {
//     return redirect(`/servers/${existingServer.id}`)
//   }
 
//   const server =  await db.server.update({
//     where: {
//         inviteCode: params.inviteCode
//     },
//     data: {
//         members: {
//             create: [
//                 {profileId: profile.id}
//             ]
//         }
//     }
   
//   })

//   if(server) {
//     return redirect(`/servers/${server.id}`)
//   }

//   return null
// }

// export default InviteCodePage









import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { type Metadata } from "next";

interface Props {
  params: {
    inviteCode: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Server Invite - ${params.inviteCode}`,
  };
}

const InviteCodePage = async ({ params }: Props) => {
  const profile = await currentProfile();
  
  if (!profile) {
    return redirect("/auth/login");
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  try {
    // Check if user is already a member
    const existingServer = await db.server.findFirst({
      where: {
        inviteCode: params.inviteCode,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (existingServer) {
      return redirect(`/servers/${existingServer.id}`);
    }

    // Join the server
    const server = await db.server.update({
      where: {
        inviteCode: params.inviteCode,
      },
      data: {
        members: {
          create: {
            profileId: profile.id,
          },
        },
      },
    });

    if (server) {
      return redirect(`/servers/${server.id}`);
    }
  } catch (error) {
    console.error("[INVITE_CODE_ERROR]", error);
    return redirect("/");
  }

  return null;
};

export default InviteCodePage;