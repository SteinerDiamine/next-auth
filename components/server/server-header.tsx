

// "use client";

// import { ServerWithMembersWithProfiles } from "@/types";
// import { MemberRole } from "@prisma/client";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   ChevronDown,
//   LogOut,
//   PlusCircle,
//   Settings,
//   Trash,
//   UserPlus,
//   Users,
// } from "lucide-react";
// import { useModal } from "@/hooks/use-modal-store";

// interface ServerHeaderProps {
//   server: ServerWithMembersWithProfiles;
//   role?: MemberRole;
// }

// const ServerHeader = ({ server, role }: ServerHeaderProps) => {
//   const { onOpen } = useModal();

//   const isAdmin = role === MemberRole.ADMIN;
//   const isModerator = isAdmin || role === MemberRole.MODERATOR;

//   return (
//     <DropdownMenu >
//       <DropdownMenuTrigger
//         className="focus:outline-none "
//         asChild
//       >
//         <button className="w-full font-semibold px-3 flex items-center dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
//           {server.name}
//           <ChevronDown className="h-5 w-5 ml-auto" />
//         </button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px] bg-gray-900">
//         {isModerator && (
//           <DropdownMenuItem
//           onClick={() => onOpen( "invite", {server} )}
//           className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
//         >
//             Invite People
//             <UserPlus className="h-4 w-4 ml-auto" />
//           </DropdownMenuItem>
//         )}
//         {isAdmin && (
//           <DropdownMenuItem
//           onClick={() => onOpen("editServer", { server })}
//            className="px-3 py-2 text-sm cursor-pointer">
//             Server Settings
//             <Settings className="h-4 w-4 ml-auto" />
//           </DropdownMenuItem>
//         )}

//         {isAdmin && (
//           <DropdownMenuItem 
//           onClick={() =>onOpen("members", {server}) }
//           className="px-3 py-2 text-sm cursor-pointer">
//             Manage Members
//             <Users className="h-4 w-4 ml-auto" />
//           </DropdownMenuItem>
//         )}

//         {isModerator && (
//           <DropdownMenuItem
//           onClick={() => onOpen("createChannel", {server}) } className="px-3 py-2 text-sm cursor-pointer">
//             Create Channel
//             <PlusCircle className="h-4 w-4 ml-auto" />
//           </DropdownMenuItem>
//         )}

//         {isModerator && <DropdownMenuSeparator />}

//         {isAdmin && (
//           <DropdownMenuItem
//           onClick={() => onOpen("deleteServer", {server})}
//            className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
//             Delete Server
//             <Trash className="h-4 w-4 ml-auto" />
//           </DropdownMenuItem>
//         )}

//         {!isAdmin && (
//           <DropdownMenuItem 
//           onClick={() => onOpen("leaveServer", {server})}
//           className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
//             Leave Server
//             <LogOut className="h-4 w-4 ml-auto" />
//           </DropdownMenuItem>
//         )}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default ServerHeader;


//@ts-nocheck
"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dropdownRef.current) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAction = (type: string) => {
    onOpen(type, { server });
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  };

  return (
    <div ref={dropdownRef} className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className={cn(
              "w-full text-md font-semibold px-4 py-3 flex items-center",
              "transition-all duration-200 ease-in-out",
              "border-b border-neutral-200 dark:border-neutral-800",
              "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80",
              "group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              "rounded-t-lg"
            )}
          >
            <span className="truncate max-w-[180px]">{server.name}</span>
            <ChevronDown className="h-4 w-4 ml-auto opacity-70 group-hover:opacity-100 transition-opacity" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          className={cn(
            "w-56 text-sm font-medium",
            "bg-white dark:bg-neutral-900",
            "border border-neutral-200 dark:border-neutral-700",
            "shadow-lg dark:shadow-neutral-950/50",
            "rounded-md overflow-hidden",
            "space-y-1 p-1"
          )}
          onCloseAutoFocus={(e) => e.preventDefault()}
          
          align="start"
          sideOffset={5}
        >
          {isModerator && (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                handleAction("invite");
              }}
              className={cn(
                "px-3 py-2 cursor-pointer",
                "text-indigo-600 dark:text-indigo-400",
                "hover:bg-indigo-50 dark:hover:bg-indigo-900/30",
                "focus:bg-indigo-50 dark:focus:bg-indigo-900/30",
                "transition-colors duration-150"
              )}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite People
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                handleAction("editServer");
              }}
              className={cn(
                "px-3 py-2 cursor-pointer",
                "text-neutral-900 dark:text-neutral-200",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                "focus:bg-neutral-100 dark:focus:bg-neutral-800",
                "transition-colors duration-150"
              )}
            >
              <Settings className="h-4 w-4 mr-2" />
              Server Settings
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem 
              onClick={(e) => {
                e.preventDefault();
                handleAction("members");
              }}
              className={cn(
                "px-3 py-2 cursor-pointer",
                "text-neutral-900 dark:text-neutral-200",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                "focus:bg-neutral-100 dark:focus:bg-neutral-800",
                "transition-colors duration-150"
              )}
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Members
            </DropdownMenuItem>
          )}

          {isModerator && (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                handleAction("createChannel");
              }}
              className={cn(
                "px-3 py-2 cursor-pointer",
                "text-neutral-900 dark:text-neutral-200",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                "focus:bg-neutral-100 dark:focus:bg-neutral-800",
                "transition-colors duration-150"
              )}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Channel
            </DropdownMenuItem>
          )}

          {isModerator && (
            <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-700" />
          )}

          {isAdmin && (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                handleAction("deleteServer");
              }}
              className={cn(
                "px-3 py-2 cursor-pointer",
                "text-rose-600 dark:text-rose-400",
                "hover:bg-rose-50 dark:hover:bg-rose-900/30",
                "focus:bg-rose-50 dark:focus:bg-rose-900/30",
                "transition-colors duration-150"
              )}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete Server
            </DropdownMenuItem>
          )}

          {!isAdmin && (
            <DropdownMenuItem 
              onClick={(e) => {
                e.preventDefault();
                handleAction("leaveServer");
              }}
              className={cn(
                "px-3 py-2 cursor-pointer",
                "text-rose-600 dark:text-rose-400",
                "hover:bg-rose-50 dark:hover:bg-rose-900/30",
                "focus:bg-rose-50 dark:focus:bg-rose-900/30",
                "transition-colors duration-150"
              )}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Leave Server
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ServerHeader;