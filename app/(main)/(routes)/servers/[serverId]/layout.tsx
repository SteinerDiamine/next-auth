import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import ServerSidebar from "@/components/server/server-sidebar";

// Corrected props interface
interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: { serverId: string };
}

export default async function ServerIdLayout({
  children,
  params,
}: ServerIdLayoutProps) {
  const profile = await currentProfile();
  if (!profile) redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: { some: { profileId: profile.id } }
    }
  });
  
  if (!server) redirect("/");

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}

// Config exports
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "edge"; // Changed from "nodejs" to "edge" as it's more modern