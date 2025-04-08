"use client"

import {
     Card,
     CardContent,
     CardFooter,
     CardHeader,
} from '@/components/ui/card';
import BackButton from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import Social from "@/components/auth/social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel?: string;
    backButtonHref?: string;
    showSocial?: boolean;
}

export const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial }: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md  text-white bg-gray-800  border-none  ">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
             {children}
            </CardContent>
           {showSocial && (
                <CardFooter>
                    <Social/>
                </CardFooter>
           )}

           <CardFooter>
            <BackButton
            className="text-white"
            label={backButtonLabel}
            href={backButtonHref}
            />
           </CardFooter>
        </Card>
    )
}


