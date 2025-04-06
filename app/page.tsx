import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button"



const font = Poppins({
  subsets: ['latin'],
  weight: ["600"],
})

const page = () => {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-gradient-to-r from-red-400 via-red-500 to-indigo-600'>
      <div className='space-y-6 text-center'>
        <h1 className={cn('text-6xl font-semibold drop-shadow-md text-gray-700', font.className)}>Auth</h1>

        <p className='text-gray-800 text-lg  '>
          Auth page with next-auth
        </p>

        <div>
          <LoginButton>
          <Button size="lg">Signin</Button>
          </LoginButton>
          
        </div>
      </div>

    </main>
  )
}

export default page