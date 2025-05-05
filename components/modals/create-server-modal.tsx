


// "use client";


// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { FileUpload } from "@/components/file-upload";
// import { useModal } from "@/hooks/use-modal-store";

// const formSchema = z.object({
//   name: z.string().min(1, { message: "Server name is required." }),
//   imageUrl: z.string().min(1, { message: "Server image is required." })
// });

// export function CreateServerModal() {

//   const {isOpen, onClose, type} = useModal();
//   const router = useRouter();

//   const isModalOpen  = isOpen && type === "createServer";

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       imageUrl: ""
//     }
//   });

//   const isLoading = form.formState.isSubmitting;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       await axios.post("/api/servers", values);

//       form.reset();
//       router.refresh();
//       onClose();
//     } catch (error) {
//       console.error(error);
//     }
//   };

 
//   const handleClose  = () => {
//     form.reset();
//     onClose();
//   }
//   return (
//     <Dialog open={isModalOpen} onOpenChange={handleClose} >
//       <DialogContent className="bg-white text-black p-0 overflow-hidden">
//         <DialogHeader className="pt-8 px-6">
//           <DialogTitle className="text-2xl text-center font-bold">
//             Customize your server
//           </DialogTitle>
//           <DialogDescription className="text-center text-zinc-500">
//             Give your server a personality with a name and an image. You can
//             always change it later.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <div className="space-y-8 px-6">
//               <div className="flex items-center justify-center text-center">
//                 <FormField
//                   control={form.control}
//                   name="imageUrl"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <FileUpload
//                           endpoint="serverImage"
//                           value={field.value}
//                           onChange={field.onChange}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
//                       Server Name
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         disabled={isLoading}
//                         placeholder="Enter server name"
//                         className="bg-zinc-300/50 border-0 focus-visible: ring-0 text-black focus-visible:ring-offset-0"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <DialogFooter className="bg-gray-100 px-6 py-4">
//               <Button disabled={isLoading} variant="primary">
//                 Create
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Server name is required." }),
  imageUrl: z.string().min(1, { message: "Server image is required." })
});

export function CreateServerModal() {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false); // Internal state instead of props
  const [isClosing, setIsClosing] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", imageUrl: "" }
  });

  // Open/close handlers
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      form.reset();
      closeModal();
      setIsClosing(false);
    }, 100);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);
      setTimeout(() => {
        router.refresh();
        handleClose();
      }, 0);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
        {/* Your form content goes here */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Form fields would go here */}
        </form>
      </div>
    </div>
  );
}