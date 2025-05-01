// import { currentProfile } from "@/lib/current-profile";
// import {v4 as uuidv4} from "uuid";

// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// import { MemberRole } from "@prisma/client";


// export async function  POST(req: Request) {
//     try {

//         const {name, imageUrl} = await req.json();
//         const profile = await currentProfile();

//         if (!profile) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         const server =  await db.server.create({
//             data: {
//                 profileId: profile.id,
//                 name: name,
//                 imageUrl: imageUrl,
//                 inviteCode: uuidv4(),
//                 channels: {
//                     create:
//                       [{name: "general", proileId: profile.id}]

//             },
//                members: {
//                 create: [
//                     {profileId: profile.id, role: MemberRole.ADMIN}
//                 ]
//                }
//         }
//         })


//         return NextResponse.json({ id: server.id }, { status: 201 });


        
//     } catch (error) {
//         console.log("[SERVER_POST]", error);
//         return new NextResponse("internal error", {
//             status: 500
//         })
//     }
// }







import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: { create: [{ name: "general", proileId: profile.id }] },
        members: { create: [{ profileId: profile.id, role: MemberRole.ADMIN }] }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}