import React from "react";

import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import ServerSidebar from "@/components/server/server-sidebar";


export default async function ServerIdLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
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
    }
  });

  if (!server) return redirect("/");

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}



// import ServerSidebar from "@/components/server/server-sidebar";
// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";

// import { redirect } from "next/navigation";

// interface ServerIdLayoutProps {
//   params: Promise<{ serverId: string }>;
//   children: React.ReactNode;
// }

// const ServerLayout: React.FC<ServerIdLayoutProps> = async ({ children, params }) => {
//   const { serverId } = await params;
//   const profile = await currentProfile();

//   if (!profile) {
//     redirect("/");
//   }

//   const server = await db.server.findUnique({
//     where: {
//       id: params.serverId,
//       members: { some: { profileId: profile.id } },
//     },
//   });

//   if (!server) {
//     redirect("/");
//   }

//   return (
//     <div className="h-full">
//       <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
//         <ServerSidebar serverId={params.serverId} />
//       </div>
//       <main className="h-full md:pl-60">{children}</main>
//     </div>
//   );
// };

// export default ServerIdLayout;
