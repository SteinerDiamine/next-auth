'use client'

import { useSession, signOut} from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user";  

 const SettingsPage = () => {
  const session = useSession();
  const user = useCurrentUser();

  const onclick = () => {
    signOut();
  }

  return (
    <div>
      {JSON.stringify(user)}
    
        <button  onClick={onclick} type="submit">
          sign out
        </button>
    
    </div>
  )
}

export default SettingsPage

