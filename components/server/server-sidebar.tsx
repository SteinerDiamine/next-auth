//@ts-nocheck
"use client";

import { useState } from "react";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video, ChevronDown, Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSearch } from "@/components/server/server-search";
import { Separator } from "@/components/ui/separator";
import ServerHeader from "./server-header";
import { ServerChannel } from "./server-channel";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const [expandedSections, setExpandedSections] = useState({
    text: true,
    voice: true,
    video: true,
    members: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sidebarContent = (
    <div className="flex flex-col h-full text-primary dark:bg-[#2b2d31] bg-[#f2f3f5]">
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
  );

  return (
    <>
      {/* Mobile Sidebar with Sheet */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="fixed left-4 top-4 z-50 p-2 rounded-md bg-[#f2f3f5] dark:bg-[#2b2d31]">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        {sidebarContent}
      </div>
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






//@ts-nocheck

// "use client";

// import { useState, useEffect } from "react";
// import { ChannelType, MemberRole } from "@prisma/client";
// import { Hash, Mic, ShieldAlert, ShieldCheck, Video, Menu, X, ChevronDown } from "lucide-react";
// import { useMediaQuery } from "@/hooks/use-media-query";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ServerSearch } from "@/components/server/server-search";
// import { Separator } from "@/components/ui/separator";
// import ServerHeader from "./server-header";
// import { ServerSection } from "./server-section";
// import { ServerChannel } from "./server-channel";
// import { ServerMember } from "./server-member";

// interface ServerSidebarProps {
//   server: any;
//   textChannels: any[];
//   audioChannels: any[];
//   videoChannels: any[];
//   members: any[];
//   role?: MemberRole;
// }

// const iconMap = {
//   [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
//   [ChannelType.VOICE]: <Mic className="mr-2 h-4 w-4" />,
//   [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
// };

// const roleIconMap = {
//   [MemberRole.GUEST]: null,
//   [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
//   [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
// };

// export function ServerSidebar({
//   server,
//   textChannels,
//   audioChannels,
//   videoChannels,
//   members,
//   role
// }: ServerSidebarProps) {
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [expandedSections, setExpandedSections] = useState({
//     text: true,
//     voice: true,
//     video: true,
//     members: true
//   });
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   useEffect(() => {
//     if (!isMobile) {
//       setIsMobileOpen(false);
//     }
//   }, [isMobile]);

//   const toggleSection = (section: string) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   return (
//     <>
//       {/* Mobile toggle button */}
//       {isMobile && (
//         <button 
//           onClick={() => setIsMobileOpen(!isMobileOpen)}
//           className="fixed left-4 top-4 z-50 p-2 rounded-md bg-[#f2f3f5] dark:bg-[#2b2d31]"
//         >
//           {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       )}

//       {/* Sidebar */}
//       <div className={`
//         ${isMobile ? "fixed inset-y-0 left-0 z-40 w-64" : "w-full"} 
//         flex flex-col h-full text-primary dark:bg-[#2b2d31] bg-[#f2f3f5]
//         transition-transform duration-300 ease-in-out
//         ${isMobile && !isMobileOpen ? "-translate-x-full" : "translate-x-0"}
//       `}>
//         <ServerHeader server={server} role={role} />
        
//         <ScrollArea className="flex-1 px-3">
//           <div className="mt-2">
//             <ServerSearch
//               data={[
//                 {
//                   label: "Text Channels",
//                   type: "channel",
//                   data: textChannels.map(channel => ({
//                     id: channel.id,
//                     name: channel.name,
//                     icon: iconMap[channel.type]
//                   }))
//                 },
//                 {
//                   label: "Voice Channels",
//                   type: "channel",
//                   data: audioChannels.map(channel => ({
//                     id: channel.id,
//                     name: channel.name,
//                     icon: iconMap[channel.type]
//                   }))
//                 },
//                 {
//                   label: "Video Channels",
//                   type: "channel",
//                   data: videoChannels.map(channel => ({
//                     id: channel.id,
//                     name: channel.name,
//                     icon: iconMap[channel.type]
//                   }))
//                 },
//                 {
//                   label: "Members",
//                   type: "member",
//                   data: members.map(member => ({
//                     id: member.id,
//                     name: member.profile.name,
//                     icon: roleIconMap[member.role]
//                   }))
//                 }
//               ]}
//             />
//           </div>
          
//           <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

//           {/* Collapsible Sections */}
//           {textChannels.length > 0 && (
//             <SectionBlock 
//               label="Text Channels"
//               section="text"
//               expanded={expandedSections.text}
//               toggle={toggleSection}
//             >
//               {textChannels.map(channel => (
//                 <ServerChannel
//                   key={channel.id}
//                   channel={channel}
//                   role={role}
//                   server={server}
//                 />
//               ))}
//             </SectionBlock>
//           )}

//           {/* Repeat for other channel types and members */}
//         </ScrollArea>
//       </div>

//       {/* Mobile overlay */}
//       {isMobile && isMobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-30"
//           onClick={() => setIsMobileOpen(false)}
//         />
//       )}
//     </>
//   );
// }

// const SectionBlock = ({ label, section, expanded, toggle, children }: any) => (
//   <div className="mb-2">
//     <button
//       onClick={() => toggle(section)}
//       className="flex items-center w-full p-2 text-sm font-medium"
//     >
//       <ChevronDown className={`h-4 w-4 mr-1 transition-transform ${
//         expanded ? 'rotate-0' : '-rotate-90'
//       }`}/>
//       <span>{label}</span>
//     </button>
//     {expanded && <div className="space-y-[2px] ml-2">{children}</div>}
//   </div>
// );