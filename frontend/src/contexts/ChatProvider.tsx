import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

interface ValueTypes {
  currentChannel: Channel;
  setCurrentChannel: React.Dispatch<React.SetStateAction<Channel>>;
  openedChat: string;
  setOpenedChat: React.Dispatch<React.SetStateAction<string>>;
  shownValue: any;
  setShownValue: React.Dispatch<React.SetStateAction<any>>;
  sendMessage: any;
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
};

const ChatContext = React.createContext(defaultValue);

export function ChatProvider({ children }) {
  const socket = io("http://localhost:8001", {
    withCredentials: true,
  });

  const router = useRouter();

  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const [openedChat, setOpenedChat] = useState("");
  const [shownValue, setShownValue] = useState("");

  const sendMessage = (values, setFieldValue) => {
    socket.emit("message", values);
    setFieldValue("message", "");
  };

  useEffect(() => {
    if (router.asPath !== "/auth/chat") setCurrentChannel(defaultChannel);
  }, [router.asPath]);

  useEffect(() => {
    socket.on(currentChannel?.channel, (data) => {
      console.log("get", data);
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
