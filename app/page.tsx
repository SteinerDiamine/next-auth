



// import { Poppins } from "next/font/google"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { LoginButton } from "@/components/auth/login-button"

// const font = Poppins({
//   subsets: ['latin'],
//   weight: ["600"],
// })

// const page = () => {
//   return (
//     <main className="flex h-screen items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-800">
//       <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl w-[90%] max-w-md space-y-6 text-center">
//         <h1 className={cn(
//           "text-5xl font-semibold text-white drop-shadow-[0_2px_5px_rgba(255,255,255,0.1)]",
//           font.className
//         )}>
//           Welcome to Auth
//         </h1>

//         <p className="text-gray-400 text-base">
//           Secure login with <span className="text-pink-400 font-medium">NextAuth.js</span>
//         </p>

//         <LoginButton>
//           <Button
//             size="lg"
//             className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white hover:scale-105 transition-all duration-300 ease-in-out shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
//           >
//             Sign In
//           </Button>
//         </LoginButton>
//       </div>
//     </main>
//   )
// }

// export default page





import { UserButton } from '@/components/auth/user-button'
import { ModeToggle } from '@/components/utils/mode-toggle'
import React from 'react'

const page = () => {
  return (
    <div>
      <UserButton />
      <ModeToggle/>
    </div>
  )
}

export default page





