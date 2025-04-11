// "use client"

// import {
//      Card,
//      CardContent,
//      CardFooter,
//      CardHeader,
// } from '@/components/ui/card';
// import BackButton from "@/components/auth/back-button";
// import { Header } from "@/components/auth/header";
// import Social from "@/components/auth/social";

// interface CardWrapperProps {
//     children: React.ReactNode;
//     headerLabel: string;
//     backButtonLabel?: string;
//     backButtonHref?: string;
//     showSocial?: boolean;
// }

// export const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial }: CardWrapperProps) => {
//     return (
//         <Card className="w-[400px] shadow-md  text-white bg-gray-800  border-none  ">
//             <CardHeader>
//                 <Header label={headerLabel} />
//             </CardHeader>
//             <CardContent>
//              {children}
//             </CardContent>
//            {showSocial && (
//                 <CardFooter>
//                     <Social/>
//                 </CardFooter>
//            )}

//            <CardFooter>
//             <BackButton
//             className="text-white"
            
//             label={backButtonLabel}
//             href={backButtonHref}
//             />
//            </CardFooter>
//         </Card>
//     )
// }










"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

import Social from "@/components/auth/social";
import BackButton from "@/components/auth/back-button";
import { Header } from "./header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md bg-gray-800 border-none">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;


