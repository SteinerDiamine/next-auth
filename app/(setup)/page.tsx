import { InitialModal } from "@/components/modals/intial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/intial-profile"
import { redirect } from "next/navigation";



const SetUpPage =  async () => {
    const profile = await initialProfile();
    const server = await  db.server.findFirst({
        where: {
            members: {
                some: {
                    id: profile.id,
                },
            }
        }
    })

    if(server){
        return redirect(`/server/${server.id}`)
    }
  return <InitialModal />;
}

export default SetUpPage