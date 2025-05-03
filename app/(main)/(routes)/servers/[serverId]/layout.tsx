import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import ServerSidebar from "@/components/server/server-sidebar";

<<<<<<< HEAD
interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>; // Wrap params in Promise
=======
// Corrected props interface
interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: { serverId: string };
>>>>>>> a94441372861c6df9f1bca09abbac6ff42d34ce2
}

export default async function ServerIdLayout({
  children,
  params,
}: ServerIdLayoutProps) {
<<<<<<< HEAD
  // Await the params promise
  const { serverId } = await params;
  
=======
>>>>>>> a94441372861c6df9f1bca09abbac6ff42d34ce2
  const profile = await currentProfile();
  if (!profile) redirect("/");

  const server = await db.server.findUnique({
    where: {
<<<<<<< HEAD
      id: serverId,
=======
      id: params.serverId,
>>>>>>> a94441372861c6df9f1bca09abbac6ff42d34ce2
      members: { some: { profileId: profile.id } }
    }
  });
  
  if (!server) redirect("/");

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}

<<<<<<< HEAD
// Remove these if not needed
export const dynamic = "force-dynamic";
export const revalidate = 0;
=======
// Config exports
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "edge"; // Changed from "nodejs" to "edge" as it's more modern
>>>>>>> a94441372861c6df9f1bca09abbac6ff42d34ce2
