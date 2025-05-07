// import { currentProfile } from "@/lib/current-profile"
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";

// import { Separator } from "../ui/separator";
// import { NavigationAction } from "./navigation-action";
// import { ScrollArea } from "../ui/scroll-area";
// import { NavigationItem } from "@/components/navigation/navigation-item";

// export const NavigationSidebar = async () => {
//     const profile = await currentProfile();

//     if(!profile){
//         return redirect("/")
//     }

//     const server = await db.server.findMany({
//         where: {
//             members: {
//                 some: {
//                     profileId: profile.id
//                 }
//             }
//         }
//     })

//     return (
//         <div
//         className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
//             <NavigationAction/>
//             <Separator
//             className="h-[2px] bg-zinc-300 dark:bg-zinc-700"/>

// <ScrollArea className="flex-1 w-full">
//         {server.map((server) => (
//           <div key={server.id} className="mb-4">
//             <NavigationItem
//               id={server.id}
//               imageUrl={server.imageUrl}
//               name={server.name}
//             />
//           </div>
//         ))}
//       </ScrollArea>
           
//         </div>
//     )
// }


import React from "react";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { ModeToggle } from "../utils/mode-toggle"; 
import { UserButton } from "../auth/user-button";


export async function NavigationSidebar() {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
    <NavigationAction />
    <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
    
    {/* Flex container that will grow but not push bottom elements off screen */}
    <div className="flex-1 w-full overflow-hidden">
      <ScrollArea className="h-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
    
    {/* Bottom section that stays fixed */}
    <div className="pb-3 flex items-center flex-col gap-y-4">
     
      <ModeToggle  />

     
      <UserButton />
    </div>
  </div>
  );
};