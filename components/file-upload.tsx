// "use client";

// import React from "react";
// import { FileIcon, X } from "lucide-react";
// import Image from "next/image";
// import "@uploadthing/react/styles.css";

// import { UploadDropzone } from "@/lib/uploadthing";

// interface FileUploadProps {
//   onChange: (url?: string) => void;
//   value: string;
//   endpoint: "messageFile" | "serverImage";
// }

// export function FileUpload({
//   onChange,
//   value,
//   endpoint
// }: FileUploadProps) {
//   const fileType = value?.split(".").pop();

//   if (value && fileType !== "pdf") {
//     return (
//       <div className="relative h-20 w-20">
//         <Image fill src={value} alt="Upload" className="rounded-full" />
//         <button
//           onClick={() => onChange("")}
//           className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
//           type="button"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>
//     );
//   }

//   if (value && fileType === "pdf") {
//     return (
//       <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
//         <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
//         <a
//           href={value}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
//         >
//           {value}
//         </a>
//         <button
//           onClick={() => onChange("")}
//           className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
//           type="button"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>
//     );
//   }

// return(
//   <div className="flex justify-center items-center w-full"> {/* Centering wrapper */}
//   <div className="w-full max-w-md"> {/* Constrain width */}
//     <UploadDropzone
//       endpoint={endpoint}
//       onClientUploadComplete={(res) => onChange(res?.[0].ufsUrl)}
//       appearance={{
//         container: {
//           margin: "0 auto", // Extra centering
//           width: "100%",
//         },
//       }}
//     />
//   </div>
// </div>
// )
 
// }



"use client";

import React from "react";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing"; 

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export function FileUpload({
  onChange,
  value,
  endpoint,
}: FileUploadProps) {
  const fileType = value?.split(".").pop();

  // ✅ Image preview
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-24 w-24 rounded-lg overflow-hidden border">
        <Image
          src={value}
          alt="Uploaded file"
          fill
          className="object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-1 right-1 bg-rose-600 hover:bg-rose-700 text-white p-1 rounded-full shadow-md"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // ✅ PDF preview
  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center gap-2 p-3 mt-2 rounded-md bg-muted border w-full max-w-md">
        <FileIcon className="h-8 w-8 text-indigo-500" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 hover:underline truncate"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="absolute top-1 right-1 bg-rose-600 hover:bg-rose-700 text-white p-1 rounded-full"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // ✅ Custom-styled UploadDropzone
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-md">
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => onChange(res?.[0].url)}
          onUploadError={(e) => console.error(e)}
          appearance={{
            container: "border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-400 hover:bg-gray-50 transition-colors text-center",
            label: "text-sm text-gray-600",
            uploadIcon: "w-8 h-8 text-gray-500 mx-auto mb-2",
            button: "bg-indigo-600 text-white px-4 py-2 rounded mt-4 hover:bg-indigo-700",
            allowedContent: "text-xs text-gray-500 mt-2",
          }}
        />
      </div>
    </div>
  );
}
