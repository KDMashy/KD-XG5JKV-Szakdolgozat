import { useRouter } from "next/dist/client/router";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

interface ValueTypes {
  currentChannel: Channel;
  setCurrentChannel: React.Dispatch<React.SetStateAction<Channel>>;
  openedChat: string;
  setOpenedChat: React.Dispatch<React.SetStateAction<string>>;
  shownValue: any;
  setShownValue: React.Dispatch<React.SetStateAction<any>>;
  sendMessage: any;
  switchRoom: any;
  socket: any;
  typeIndicator: boolean;
  setTypeIndicator: React.Dispatch<React.SetStateAction<boolean>>;
  redirectPage: any;
}
interface Channel {
  id?: number | string;
  username?: string;
  channel?: string;
  sender?: string;
  message_channel?: string;
  is_active?: string;
  send_notifications?: string;
  firstUserId?: number;
  secondUserId?: number;
}

const defaultChannel: Channel = {
  id: "default",
  username: "Loading Channels...",
};

const defaultValue: ValueTypes = {
  currentChannel: defaultChannel,
  setCurrentChannel: () => {},
  openedChat: "",
  setOpenedChat: () => {},
  shownValue: "",
  setShownValue: () => {},
  sendMessage: () => {},
  switchRoom: () => {},
  socket: null,
  typeIndicator: false,
  setTypeIndicator: () => {},
  redirectPage: () => {},
};

const ChatContext = React.createContext(defaultValue);

export function ChatProvider({ children }) {
  const socket = io("http://localhost:8001", {
    withCredentials: true,
    transports: ["websocket"],
  });
  const { user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: false,
  });

  const router = useRouter();

  const [currentChannel, setCurrentChannel] = useState<Channel>(defaultChannel);
  const [openedChat, setOpenedChat] = useState("");
  const [shownValue, setShownValue] = useState("");
  const [typeIndicator, setTypeIndicator] = useState(false);

  const sendMessage = (values, setFieldValue) => {
    socket.emit("message", {
      channelId: currentChannel?.id,
      senderId: user?.id,
      message_content: values?.message,
      channel: currentChannel?.channel,
      sender: user?.username,
      is_active: currentChannel?.is_active,
      send_notifications: currentChannel?.send_notifications,
      firstUserId: currentChannel?.firstUserId,
      secondUserId: currentChannel?.secondUserId,
    });
    setFieldValue("message", "");
  };

  const switchRoom = async (room) => {
    if (currentChannel?.channel !== defaultChannel?.channel)
      socket.emit("message", {
        channelId: currentChannel?.id,
        senderId: user?.id,
        message_content: "DISCONNECT",
        channel: currentChannel?.channel,
        sender: user?.username,
        is_active: currentChannel?.is_active,
        send_notifications: currentChannel?.send_notifications,
        firstUserId: currentChannel?.firstUserId,
        secondUserId: currentChannel?.secondUserId,
      });
    await socket.removeAllListeners(currentChannel?.channel);
    await setCurrentChannel({
      id: room?.id,
      username: user?.username,
      channel: room?.message_channel,
      is_active: room?.is_active,
      send_notifications: room?.send_notifications,
      firstUserId: room?.firstUserId,
      secondUserId: room?.secondUserId,
    });
  };

  const redirectPage = async (path) => {
    await socket.removeAllListeners(currentChannel?.channel);
    await setCurrentChannel(defaultChannel);
    router.push(path);
  };

  useEffect(() => {
    if (currentChannel?.channel)
      socket.emit("message", {
        channelId: currentChannel?.id,
        senderId: user?.id,
        message_content: "CONNECT",
        channel: currentChannel?.channel,
        sender: user?.username,
        is_active: currentChannel?.is_active,
        send_notifications: currentChannel?.send_notifications,
        firstUserId: currentChannel?.firstUserId,
        secondUserId: currentChannel?.secondUserId,
      });
  }, [currentChannel]);

  return (
    <ChatContext.Provider
      value={{
        currentChannel,
        setCurrentChannel,
        openedChat,
        setOpenedChat,
        shownValue,
        setShownValue,
        sendMessage,
        switchRoom,
        socket,
        typeIndicator,
        setTypeIndicator,
        redirectPage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
