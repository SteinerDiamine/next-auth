




// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { UserButton } from "@/components/auth/user-button";

// export const Navbar = () => {
//   const pathname = usePathname();

//   return (
//     <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
//       <div className="flex gap-x-2">
//         <Button 
//           asChild
//           variant={pathname === "/server" ? "default" : "outline"}
//         >
//           <Link href="/server">
//             Server
//           </Link>
//         </Button>
//         <Button 
//           asChild
//           variant={pathname === "/client" ? "default" : "outline"}
//         >
//           <Link href="/client">
//             Client
//           </Link>
//         </Button>
//         <Button 
//           asChild
//           variant={pathname === "/admin" ? "default" : "outline"}
//         >
//           <Link href="/admin">
//             Admin
//           </Link>
//         </Button>
//         <Button 
//           asChild
//           variant={pathname === "/settings" ? "default" : "outline"}
//         >
//           <Link href="/settings">
//             Settings
//           </Link>
//         </Button>
//       </div>
//       <UserButton />
//     </nav>
//   );
// };





"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

const navLinks = [
  { label: "Server", href: "/server" },
  { label: "Client", href: "/client" },
  { label: "Admin", href: "/admin" },
  { label: "Settings", href: "/settings" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-muted/50 border border-border backdrop-blur-md shadow-md rounded-2xl px-6 py-3 w-full max-w-5xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-4">
        {navLinks.map((link) => (
          <Button
            key={link.href}
            asChild
            variant={pathname === link.href ? "default" : "ghost"}
            className={`relative px-4 py-2 rounded-xl text-sm transition-all ${
              pathname === link.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Link href={link.href}>
              {link.label}
              {pathname === link.href && (
                <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-primary rounded-full" />
              )}
            </Link>
          </Button>
        ))}
      </div>
      <div className="ml-4">
        <UserButton />
      </div>
    </nav>
  );
};
