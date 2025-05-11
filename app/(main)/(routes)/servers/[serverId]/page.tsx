import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

interface ServerIdPageProps {
   params: {
      serverId: string
   }
}

const ServerIdPage = async({
  params } :   ServerIdPageProps
) => {

  const profile =  await currentProfile()
  if(!profile) {
    return redirect('/')
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  })

  const intialChannel = server?.channels[0];

  if(intialChannel?.name !== "general") {
    return null
  }

  return redirect(`/servers/${params.serverId}/channels/${intialChannel.id}`)
 
}

export default ServerIdPage