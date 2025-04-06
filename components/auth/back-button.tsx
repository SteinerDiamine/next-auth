'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  label: string;
  href: string;
  className?: string;
}

const BackButton = ({
    href,
    label,
    className
}: BackButtonProps) => {
  return (
    // <Button variant={"link"} className="font-normal w-full size-sm " asChild>

    <Button
    variant="link"
    className={cn("font-normal w-full text-sm", className)}
    asChild
  >
        <Link 
        href={href}>{label}</Link>
    </Button>
  )
}

export default BackButton