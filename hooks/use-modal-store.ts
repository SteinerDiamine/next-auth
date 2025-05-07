import {create} from 'zustand';
import { Channel, ChannelType, Server } from "@prisma/client";

export type ModalType = "createServer" | "invite" | "editServer"| "members" | "createChannel" |  "deleteServer" | "leaveServer" | "deleteChannel" | "editChannel"| "channelType" ;



interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}



interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
  }



export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    // onClose: () => set({ type: null, isOpen: false }),
    onClose: () => set({ isOpen: false, type: null,  }),
  }));






