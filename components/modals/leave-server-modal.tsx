
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";




export function LeaveServer() {
  const router =  useRouter();

  const onClick = async  () => {
    try {
      await axios.patch(`/api/servers/${server?.id}/leave`)
      onClose()
      router.push('/')
      
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  }

  const {isOpen, onClose, type, data} = useModal();

  const isModalOpen  = isOpen && type === "leaveServer";
  const {server} = data;

  const [copied, setCopied] = useState(false);
  const [isloading, setLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leave server
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to leave this server? <span className="font-semibold text-zinc-500">
              {server?.name}
            </span>
          </DialogDescription>
        </DialogHeader>

       <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button 
              disabled={isloading}
              onClick={onClose}
              variant={"ghost"}>
              Cancel
            </Button>
            <Button
              disabled={isloading}
              onClick= {onClick}
              variant={"primary"}
              >
              Confirm
            </Button>
          </div>
       </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}