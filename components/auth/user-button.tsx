"use client"

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,

} from '@/components/ui/dropdown-menu'

import {
     Avatar,
     AvatarImage,
     AvatarFallback } 
from '@/components/ui/avatar'

import { FaUser } from 'react-icons/fa'
import { useCurrentUser } from '@/hooks/use-current-user'
import { LogoutButton } from './logout-button'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

interface UserButtonProps {
    src?: string;
    className?: string;
}


export const UserButton = ({src, className}: UserButtonProps) => {

    const user = useCurrentUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={className}>
                <Avatar className="w-10 h-10 cursor-pointer">
                     <AvatarImage src={src || user?.image || ""} />
                    <AvatarFallback className='bg-gray-600'>
                        <FaUser className="text-white" size={20} />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40 ' align="end" >
                <LogoutButton>
                    <DropdownMenuItem>
                        <ArrowRightOnRectangleIcon className='h-4 w-4 mr-2'/>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}