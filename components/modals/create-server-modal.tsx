


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

export function CreateServerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", imageUrl: "" }
  });

  // Debugging effect
  useEffect(() => {
    console.log(`Modal state - isOpen: ${isOpen}, isClosing: ${isClosing}`);
  }, [isOpen, isClosing]);

  // Safe close handler
  const handleClose = () => {
    if (isClosing) return;
    
    console.log("Starting close sequence");
    setIsClosing(true);
    
    // Reset form asynchronously
    setTimeout(() => {
      form.reset();
      console.log("Form reset complete");
      
      // Close modal after cleanup
      onClose();
      setIsClosing(false);
      console.log("Modal close complete");
    }, 100); // Small delay to ensure UI responsiveness
  };

  // Enhanced submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting form");
      await axios.post("/api/servers", values);
      
      // Ensure router operations don't block
      setTimeout(() => {
        router.refresh();
        handleClose();
        console.log("Navigation complete");
      }, 0);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Event listeners with proper cleanup
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        e.preventDefault();
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
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md mx-4"
      >
        {/* Modal content remains the same as previous example */}
        {/* ... */}
        
        <div className="p-4 flex justify-end space-x-2 border-t">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700"
          >
            Close
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
              form.handleSubmit(onSubmit)();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}