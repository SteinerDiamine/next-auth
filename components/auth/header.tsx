import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ['latin'], 
    weight: ["600"]

})

interface HeaderProps {
    label: string;
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1 className={cn(font, "text-4xl font-semibold")}>
                Auth
            </h1>

            <p className="text-muted-foreground text-sm">
                {label}
            </p>

        </div>
    )
}