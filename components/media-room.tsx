"use client";

import React, { useEffect, useState } from "react";
import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export function MediaRoom({ chatId, video, audio }: MediaRoomProps) {
  const { data: session } = useSession();
  const [token, setToken] = useState("");

  useEffect(() => {
    const username = session?.user?.name || session?.user?.email;

    if (!username) return;

    (async () => {
      try {
        const response = await fetch(
          `/api/livekit?room=${chatId}&username=${encodeURIComponent(username)}`
        );
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error("Failed to fetch token:", error);
      }
    })();
  }, [session, chatId]);

  if (!token)
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );

  return (
    <LiveKitRoom
      video={video}
      audio={audio}
      token={token}
      connect={true}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
