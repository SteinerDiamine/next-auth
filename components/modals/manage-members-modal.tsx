


"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";




export function MembersModal() {

  const {isOpen, onClose, type, data, onOpen} = useModal();
  

  const isModalOpen  = isOpen && type === "members";
  const {server} = data as { server: ServerWithMembersWithProfiles};


 
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black  overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
          {server?.members?.length}
        </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
              {server?.members?.map((member) => (
                <div key={member.id} className="items-center flex gap-x-2 mb-6">
                  <UserAvatar src={member.profile.ImageUrl}/>
                  <div className="flex flex-col gap-y-1">
                    <div className="text-xs font-semibold flex items-center">
                      {member.profile.name}
                    </div>
                  </div>
                </div>
              ))}
        </ScrollArea>
      
       <div className="p-6">
        
       </div>
      </DialogContent>
    </Dialog>
  );
}