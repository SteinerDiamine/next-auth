import React from "react";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversation";
import { ChatHeader } from "@/components/chat/chat-header";
// import { ChatInput } from "@/components/chat/chat-input";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

export default async function MemberIdPage({
  params: { memberId, serverId },
  searchParams: { video }
}: MemberIdPageProps) {
  const profile = await currentProfile();

  if (!profile) return ("/");

  const currentMember = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id
    },
    include: {
      profile: true
    }
  });

  if (!currentMember) return redirect("/");

  const conversation = await getOrCreateConversation(
    currentMember.id,
    memberId
  );

  if (!conversation) return redirect(`/servers/${serverId}`);

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.ImageUrl}
        name={otherMember.profile.name ?? "User"}
        serverId={serverId}
        type="conversation"
      />
      
   
    </div>
  );
}