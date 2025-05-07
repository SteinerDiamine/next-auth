import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { channelId: string } }) {
    try {

        const profile = await currentProfile();
        const {searchParams} = new URL(request.url);
        const serverId = searchParams.get('serverId')

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!serverId) {
            return new NextResponse("Server ID is required", {status: 400});
        };

        if(!params.channelId) {
            return new NextResponse("Channel ID is required", {status: 400});
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR] // Correct way to check multiple roles
                          }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general"
                        }
                    }
                }
            }
        })


  return NextResponse.json(server)

        
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });

        
    }
}














export async function PATCH(request: Request, { params }: { params: { channelId: string } }) {
    try {

        const profile = await currentProfile();
        const {searchParams} = new URL(request.url);
        const {name, type} = await request.json();
        const serverId = searchParams.get('serverId')

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!serverId) {
            return new NextResponse("Server ID is required", {status: 400});
        };

        if(!params.channelId) {
            return new NextResponse("Channel ID is required", {status: 400});
        }

        if(name === "general") {
            return new NextResponse("Channel name cannot be 'general'", {status: 400});
        }



        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR] // Correct way to check multiple roles
                          }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: params.channelId,
                            NOT: {
                                name: "general",
                            }
                        },
                        data: {
                            name,
                            type
                        }
                    }
                }
            }
        })


  return NextResponse.json(server)

        
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });

        
    }
}