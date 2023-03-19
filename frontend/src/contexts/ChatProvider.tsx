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
}
interface Channel {
  id?: number | string;
  username?: string;
  channel?: string;
  sender?: string;
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
      message: values?.message,
      channel: currentChannel?.channel,
      sender: user?.username,
    });
    setFieldValue("message", "");
  };

  const switchRoom = async (room) => {
    if (currentChannel?.channel !== defaultChannel?.channel)
      socket.emit("message", {
        message: "DISCONNECT",
        channel: currentChannel?.channel,
        sender: user?.username,
      });
    await socket.removeAllListeners(currentChannel?.channel);
    setCurrentChannel({
      username: user?.username,
      channel: room,
    });
  };

  const removeListener = async () => {
    await socket.removeAllListeners(currentChannel?.channel);
    setCurrentChannel(defaultChannel);
  };

  useEffect(() => {
    removeListener();
  }, [router.asPath]);

  useEffect(() => {
    if (currentChannel?.channel !== defaultChannel?.channel)
      socket.emit("message", {
        message: "CONNECT",
        channel: currentChannel?.channel,
        sender: user?.username,
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
