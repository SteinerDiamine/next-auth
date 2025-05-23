
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




export function DeleteServerModal() {
  const router =  useRouter();

  const onClick = async  () => {
    try {
      await axios.delete(`/api/servers/${server?.id}`)
      onClose()
      router.push('/')
      
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  }

  const {isOpen, onClose, type, data} = useModal();

  const isModalOpen  = isOpen && type === "deleteServer";
  const {server} = data;

  const [copied, setCopied] = useState(false);
  const [isloading, setLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this server?<br/> <span className="font-semibold text-indigo-500">
              {server?.name} will be permanently deleted.
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