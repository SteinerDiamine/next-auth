// import { redirect } from "next/navigation";
// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";
// import { ServerSidebar } from "@/components/server/server-sidebar";

// interface ServerIdLayoutProps {
//   children: React.ReactNode;
//   params: Promise<{ serverId: string }>; 
// }

// export default async function ServerIdLayout({
//   children,
//   params,
// }: ServerIdLayoutProps) {


  
//   const { serverId } = await params;
  
//   const profile = await currentProfile();
//   if (!profile) redirect("/");

//   const server = await db.server.findUnique({
//     where: {
//       id: serverId,
//       members: { some: { profileId: profile.id } }
//     }
//   });
  
//   if (!server) redirect("/");


//   return (
//     <div className="h-full">
//       <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
//         <ServerSidebar serverId={serverId} />
//       </div>
//       <main className="h-full md:pl-60">{children}</main>
//     </div>
//   );
// }


// export const dynamic = "force-dynamic";
// export const revalidate = 0;





//@ts-nocheck
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerSidebar } from "@/components/server/server-sidebar";

interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: { serverId: string }; // Changed from Promise to direct object
}

export default async function ServerIdLayout({
  children,
  params,
}: ServerIdLayoutProps) {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc"
        }
      },
      members: {
        include: {
          profile: true
        },
        orderBy: {
          role: "asc"
        }
      }
    }
  });

  if (!server) return redirect("/");

  // Filter channels and members
  const textChannels = server.channels.filter(
    channel => channel.type === "TEXT"
  );
  const audioChannels = server.channels.filter(
    channel => channel.type === "VOICE"
  );
  const videoChannels = server.channels.filter(
    channel => channel.type === "VIDEO"
  );
  const members = server.members.filter(
    member => member.profileId !== profile.id
  );
  const role = server.members.find(
    member => member.profileId === profile.id
  )?.role;

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar 
          server={server}
          textChannels={textChannels}
          audioChannels={audioChannels}
          videoChannels={videoChannels}
          members={members}
          role={role}
        />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;