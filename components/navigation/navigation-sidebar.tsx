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
        // <div className="h-full">
        //   {/* Mobile Toggle Button could go here */}
        //   <div className="hidden md:flex space-y-4 flex-col h-full items-center text-primary w-full dark:bg-[#1e1f22] bg-[#e3e5e8] py-3 md:w-[80px]">
        //     {/* Only visible on md and up */}
        //     <NavigationAction />
        //     <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
        //     <ScrollArea className="flex-1 w-full">
        //       {servers.map((server) => (
        //         <div key={server.id} className="mb-4">
        //           <NavigationItem
        //             id={server.id}
        //             imageUrl={server.imageUrl}
        //             name={server.name}
        //           />
        //         </div>
        //       ))}
        //     </ScrollArea>
        //     <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        //       <ModeToggle />
        //       <UserButton />
        //     </div>
        //   </div>
      
        //   {/* Mobile Sidebar Drawer */}
        //   <div className="md:hidden">
        //     {/* You could implement a drawer/slide-over using state or a library like Radix UI or ShadCN's drawer */}
        //     {/* Example placeholder for mobile sidebar or hamburger logic */}
        //     <p className="text-center text-sm text-muted-foreground">Mobile sidebar coming soon...</p>
        //   </div>
        // </div>


        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full py-3 dark: bg-[#1E1F22]">
        <NavigationAction />
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
        <ScrollArea className="flex-1 w-full">
          {servers.map((server) => (
            <NavigationItem key={server.id} id={server.id} name={server.name} imageUrl={server.imageUrl} />
          ))}
        </ScrollArea>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
          <ModeToggle />
          <UserButton  />
        </div>
      </div>
      );
    }
      