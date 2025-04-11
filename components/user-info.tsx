

// import { ExtendedUser } from "@/next-auth";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ShieldCheck, Mail, User as UserIcon, KeyRound, Lock } from "lucide-react";

// interface UserInfoProps {
//   user?: ExtendedUser;
//   label: string;
// }

// const infoItems = [
//   { label: "ID", icon: <KeyRound className="w-4 h-4 text-muted-foreground" />, key: "id" },
//   { label: "Name", icon: <UserIcon className="w-4 h-4 text-muted-foreground" />, key: "name" },
//   { label: "Email", icon: <Mail className="w-4 h-4 text-muted-foreground" />, key: "email" },
//   { label: "Role", icon: <ShieldCheck className="w-4 h-4 text-muted-foreground" />, key: "role" },
// ];

// export const UserInfo = ({ user, label }: UserInfoProps) => {
//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-2xl border border-border bg-background">
//       <CardHeader>
//         <h2 className="text-3xl font-bold text-center text-foreground tracking-tight">{label}</h2>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {infoItems.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between gap-4 p-4 border rounded-xl shadow-sm bg-muted hover:bg-muted/60 transition-colors"
//           >
//             <div className="flex items-center gap-2">
//               {item.icon}
//               <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
//             </div>
//             <span className="text-sm font-mono text-foreground truncate max-w-[60%]">
//               {user?.[item.key as keyof ExtendedUser] || "—"}
//             </span>
//           </div>
//         ))}

//         <div className="flex items-center justify-between gap-4 p-4 border rounded-xl shadow-sm bg-muted hover:bg-muted/60 transition-colors">
//           <div className="flex items-center gap-2">
//             <Lock className="w-4 h-4 text-muted-foreground" />
//             <span className="text-sm font-medium text-muted-foreground">
//               Two Factor Authentication
//             </span>
//           </div>
//           <Badge variant={user?.isTwoFactorEnabled ? "default" : "destructive"}>
//             {user?.isTwoFactorEnabled ? "ON" : "OFF"}
//           </Badge>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };






import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Mail, User as UserIcon, KeyRound, Lock } from "lucide-react";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

const infoItems = [
  { label: "ID", icon: <KeyRound className="w-4 h-4 text-muted-foreground" />, key: "id" },
  { label: "Name", icon: <UserIcon className="w-4 h-4 text-muted-foreground" />, key: "name" },
  { label: "Email", icon: <Mail className="w-4 h-4 text-muted-foreground" />, key: "email" },
  { label: "Role", icon: <ShieldCheck className="w-4 h-4 text-muted-foreground" />, key: "role" },
];

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl border border-border bg-gradient-to-br from-background to-muted/40">
      <CardHeader className="border-b border-border pb-4">
        <h2 className="text-4xl font-extrabold text-center tracking-tight text-primary">
          {label}
        </h2>
      </CardHeader>

      <CardContent className="space-y-5 py-6 px-4 sm:px-6">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-4 border border-border rounded-xl shadow-sm bg-muted/60 hover:bg-muted/80 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm font-semibold text-muted-foreground">{item.label}</span>
            </div>
            <span className="text-sm font-mono text-foreground truncate max-w-[60%]">
              {user?.[item.key as keyof ExtendedUser] || "—"}
            </span>
          </div>
        ))}

        <div className="flex items-center justify-between gap-4 p-4 border border-border rounded-xl shadow-sm bg-muted/60 hover:bg-muted/80 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">
              Two Factor Authentication
            </span>
          </div>
          <Badge
            variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            className="px-3 py-1 rounded-full text-xs font-bold"
          >
            {user?.isTwoFactorEnabled ? "ENABLED" : "DISABLED"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
