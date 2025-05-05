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
    // <div className="h-full">
    //   <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
    //     <ServerSidebar serverId={serverId} />
    //   </div>
    //   <main className="h-full md:pl-60">{children}</main>
    // </div>
//   );
// }


// export const dynamic = "force-dynamic";
// export const revalidate = 0;





//@ts-nocheck
// import { redirect } from "next/navigation";
// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";
// import { ServerSidebar } from "@/components/server/server-sidebar";
// import { ChannelType, MemberRole } from "@prisma/client";

// interface ServerIdLayoutProps {
//   children: React.ReactNode;
//   params: { serverId: string };
// }

// export default async function ServerIdLayout({
//   children,
//   params,
// }: ServerIdLayoutProps) {
//   const profile = await currentProfile();
//   if (!profile) return redirect("/");

//   const server = await db.server.findUnique({
//     where: {
//       id: params.serverId,
//       members: { some: { profileId: profile.id } }
//     },
//     include: {
//       channels: {
//         orderBy: { createdAt: "asc" }
//       },
//       members: {
//         include: { profile: true },
//         orderBy: { role: "asc" }
//       }
//     }
//   });

//   if (!server) return redirect("/");

//   // Filter data for the sidebar
//   const textChannels = server.channels.filter(
//     (channel) => channel.type === ChannelType.TEXT
//   );
//   const audioChannels = server.channels.filter(
//     (channel) => channel.type === ChannelType.VOICE
//   );
//   const videoChannels = server.channels.filter(
//     (channel) => channel.type === ChannelType.VIDEO
//   );
//   const members = server.members.filter(
//     (member) => member.profileId !== profile.id
//   );
//   const role = server.members.find(
//     (member) => member.profileId === profile.id
//   )?.role;

//   return (
//     <div className="h-full">
//       {/* ServerSidebar handles both mobile and desktop views internally */}
//       <ServerSidebar 
//         server={server}
//         textChannels={textChannels}
//         audioChannels={audioChannels}
//         videoChannels={videoChannels}
//         members={members}
//         role={role}
//       />
      
//       {/* Main content with left padding for desktop sidebar */}
//       <main className="h-full md:pl-60">
//         {children}
//       </main>
//     </div>
//   );
// }

// export const dynamic = "force-dynamic";
// export const revalidate = 0;









import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerSidebar } from "@/components/server/server-sidebar";
import { ChannelType, MemberRole } from "@prisma/client";

interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: { serverId: string };
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
      members: { some: { profileId: profile.id } }
    },
    include: {
      channels: {
        orderBy: { createdAt: "asc" },
        where: {
          type: {
            in: [ChannelType.TEXT, ChannelType.VOICE, ChannelType.VIDEO]
          }
        }
      },
      members: {
        include: { profile: true },
        orderBy: { role: "asc" }
      }
    }
  });

  if (!server) return redirect("/");

  // Filter channels by type
  const textChannels = server.channels.filter(c => c.type === ChannelType.TEXT);
  const audioChannels = server.channels.filter(c => c.type === ChannelType.VOICE);
  const videoChannels = server.channels.filter(c => c.type === ChannelType.VIDEO);
  const members = server.members.filter(m => m.profileId !== profile.id);
  const role = server.members.find(m => m.profileId === profile.id)?.role;

  return (
    <div className="h-full">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:block fixed inset-y-0 left-0 w-60 z-20">
        <ServerSidebar 
          server={server}
          textChannels={textChannels}
          audioChannels={audioChannels}
          videoChannels={videoChannels}
          members={members}
          role={role}
          isMobile={false}
        />
      </div>

      {/* Mobile Sidebar Toggle is now handled within the ServerSidebar component */}
      <main className="h-full md:pl-60 relative">
        {children}
      </main>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;