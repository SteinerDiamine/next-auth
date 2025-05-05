

// import React from "react";
// import { redirect } from "next/navigation";
// import { ChannelType, MemberRole } from "@prisma/client";
// import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";


// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ServerSearch } from "@/components/server/server-search";
// import { Separator } from "@/components/ui/separator";
// ;
// import ServerHeader from "./server-header";
// import { ServerSection } from "./server-section";
// import { ServerChannel } from "./server-channel";
// import { ServerMember } from "./server-member";

// const iconMap = {
//   [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
//   [ChannelType.VOICE]: <Mic className="mr-2 h-4 w-4" />,
//   [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
// };

// const roleIconMap = {
//   [MemberRole.GUEST]: null,
//   [MemberRole.MODERATOR]: (
//     <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
//   ),
//   [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
// };

// export async function ServerSidebar({ serverId }: { serverId: string }) {
//   const profile = await currentProfile();

//   if (!profile) return redirect("/");

//   const server = await db.server.findUnique({
//     where: {
//       id: serverId
//     },
//     include: {
//       channels: {
//         orderBy: {
//           createdAt: "asc"
//         }
//       },
//       members: {
//         include: {
//           profile: true
//         },
//         orderBy: {
//           role: "asc"
//         }
//       }
//     }
//   });

//   const textChannels = server?.channels.filter(
//     (channel) => channel.type === ChannelType.TEXT
//   );
//   const audioChannels = server?.channels.filter(
//     (channel) => channel.type === ChannelType.VOICE
//   );
//   const videoChannels = server?.channels.filter(
//     (channel) => channel.type === ChannelType.VIDEO
//   );

//   const members = server?.members.filter(
//     (member) => member.profileId !== profile.id
//   );

//   if (!server) return redirect("/");

//   const role = server.members.find(
//     (member) => member.profileId === profile.id
//   )?.role;

//   return (
//     <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
//       <ServerHeader server={server} role={role} />
//       <ScrollArea className="flex-1 px-3">
//         <div className="mt-2">
//           <ServerSearch
//             data={[
//               {
//                 label: "Text Channels",
//                 type: "channel",
//                 data: textChannels?.map((channel) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Voice Channels",
//                 type: "channel",
//                 data: audioChannels?.map((channel) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Video Channels",
//                 type: "channel",
//                 data: videoChannels?.map((channel) => ({
//                   id: channel.id,
//                   name: channel.name,
//                   icon: iconMap[channel.type]
//                 }))
//               },
//               {
//                 label: "Members",
//                 type: "member",
//                 //@ts-ignore
//                 data: members?.map((member) => ({
//                   id: member.id,
//                   name: member.profile.name,
//                   icon: roleIconMap[member.role]
//                 }))
//               }
//             ]}
//           />
//         </div>
//         <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
//         {!!textChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.TEXT}
//               role={role}
//               label="Text Channels"
//             />
//             <div className="space-y-[2px]">
//               {textChannels.map((channel) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         {!!audioChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.VOICE}
//               role={role}
//               label="Voice Channels"
//             />
//             <div className="space-y-[2px]">
//               {audioChannels.map((channel) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         {!!videoChannels?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="channels"
//               channelType={ChannelType.VIDEO}
//               role={role}
//               label="Video Channels"
//             />
//             <div className="space-y-[2px]">
//               {videoChannels.map((channel) => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         {!!members?.length && (
//           <div className="mb-2">
//             <ServerSection
//               sectionType="members"
//               role={role}
//               label="Members"
//               server={server}
//             />
//             <div className="space-y-[2px]">
//               {members.map((member) => (
//                 <ServerMember key={member.id} member={member} server={server} />
//               ))}
//             </div>
//           </div>
//         )}
//       </ScrollArea>
//     </div>
//   );
// }






//@ts-nocheck

"use client";

import { useState, useEffect } from "react";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video, Menu, X, ChevronDown } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSearch } from "@/components/server/server-search";
import { Separator } from "@/components/ui/separator";
import ServerHeader from "./server-header";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
  server: any;
  textChannels: any[];
  audioChannels: any[];
  videoChannels: any[];
  members: any[];
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.VOICE]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
};

export function ServerSidebar({
  server,
  textChannels,
  audioChannels,
  videoChannels,
  members,
  role
}: ServerSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    text: true,
    voice: true,
    video: true,
    members: true
  });
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!isMobile) {
      setIsMobileOpen(false);
    }
  }, [isMobile]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed left-4 top-4 z-50 p-2 rounded-md bg-[#f2f3f5] dark:bg-[#2b2d31]"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? "fixed inset-y-0 left-0 z-40 w-64" : "w-full"} 
        flex flex-col h-full text-primary dark:bg-[#2b2d31] bg-[#f2f3f5]
        transition-transform duration-300 ease-in-out
        ${isMobile && !isMobileOpen ? "-translate-x-full" : "translate-x-0"}
      `}>
        <ServerHeader server={server} role={role} />
        
        <ScrollArea className="flex-1 px-3">
          <div className="mt-2">
            <ServerSearch
              data={[
                {
                  label: "Text Channels",
                  type: "channel",
                  data: textChannels.map(channel => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type]
                  }))
                },
                {
                  label: "Voice Channels",
                  type: "channel",
                  data: audioChannels.map(channel => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type]
                  }))
                },
                {
                  label: "Video Channels",
                  type: "channel",
                  data: videoChannels.map(channel => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type]
                  }))
                },
                {
                  label: "Members",
                  type: "member",
                  data: members.map(member => ({
                    id: member.id,
                    name: member.profile.name,
                    icon: roleIconMap[member.role]
                  }))
                }
              ]}
            />
          </div>
          
          <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

          {/* Collapsible Sections */}
          {textChannels.length > 0 && (
            <SectionBlock 
              label="Text Channels"
              section="text"
              expanded={expandedSections.text}
              toggle={toggleSection}
            >
              {textChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </SectionBlock>
          )}

          {/* Repeat for other channel types and members */}
        </ScrollArea>
      </div>

      {/* Mobile overlay */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}

const SectionBlock = ({ label, section, expanded, toggle, children }: any) => (
  <div className="mb-2">
    <button
      onClick={() => toggle(section)}
      className="flex items-center w-full p-2 text-sm font-medium"
    >
      <ChevronDown className={`h-4 w-4 mr-1 transition-transform ${
        expanded ? 'rotate-0' : '-rotate-90'
      }`}/>
      <span>{label}</span>
    </button>
    {expanded && <div className="space-y-[2px] ml-2">{children}</div>}
  </div>
);