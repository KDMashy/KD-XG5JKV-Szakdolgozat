import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Button from "../../../components/common/Button";
import { CustomInput } from "../../../components/common/form/CustomInput";
import Loading from "../../../components/common/Loading";
import { useChatContext } from "../../../contexts/ChatProvider";
import { useAuth } from "../../../hooks/useAuth";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";
import {
  checkMessageDictionary,
  returnEmitMessageWithDic,
} from "../../../helpers/Helpers";
import CustomForm from "../../../components/common/form/CustomForm";
import Message from "../../../components/common/chat/Message";
import MessageInput from "../../../components/common/chat/MessageInput";
import MessageList from "../../../components/common/chat/MessageList";

function ChatPage() {
  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: false,
  });
  const initialValues = {
    message: "",
  };

  const [typing, setTyping] = useState(false);
  const [texting, setTexting] = useState("");
  const [sentMessage, setSentMessage] = useState(false);
  const [typeIndicator, setTypeIndicator] = useState(false);

  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const [messages, setMessages] = useState([]);
  const [messageCounter, setMessageCounter] = useState(0);

  const [loadedMore, setLoadedMore] = useState(false);
  const [loadedOnce, setLoadedOnce] = useState(false);

  const chatBottom = useRef(null);

  const { currentChannel, switchRoom, sendMessage, socket } = useChatContext();

  const getChannels = async () => {
    setLoading(true);
    await axios(
      "get",
      `${API_URL}/chat/channels`,
      null,
      null,
      (res) => {
        let tmp = [];
        res?.data?.map((item) => {
          if (
            !tmp?.filter(
              (tmpItem) => tmpItem?.message_channel === item?.message_channel
            )[0]
          )
            tmp.push({
              id: item?.id,
              receiverName: item?.message_channel?.includes("group")
                ? item?.message_channel?.replaceAll("_", " ").split(".")[1]
                : item?.second_user?.username,
              message_channel: item?.message_channel,
              is_active: item?.is_active,
              send_notifications: item?.send_notifications,
              firstUserId: item?.first_user?.id,
              secondUserId: item?.second_user?.id,
            });
        });
        setChannels(tmp);
        setLoadedOnce(true);
      },
      null,
      () => setLoading(false)
    );
  };

  const getMessages = async (newFetch = false) => {
    if (newFetch) {
      await setLoadedMore(false);
      await setMessages([]);
    }
    await axios(
      "get",
      `${API_URL}/chat/messages`,
      {
        id: currentChannel?.id,
        offset: !newFetch ? offset : 0,
        limit: limit,
      },
      null,
      (res) => {
        if (!newFetch) {
          let tmp = res?.data?.messages;
          messages.map((message) => {
            tmp.push(message);
          });
          setLoadedMore(true);
          setOffset(tmp?.length);
          setMessages(tmp);
        } else {
          setOffset(res?.data?.messages?.length);
          setMessages(res?.data?.messages);
        }
        setMessageCounter(res?.data?.counter);
      }
    );
  };

  useEffect(() => {
    if (user && !loadedOnce) getChannels();
  }, [user]);

  useEffect(() => {
    if (currentChannel?.channel) {
      getMessages(true);
    } else {
      setMessages([]);
      setMessageCounter(0);
      setLoadedMore(false);
    }
  }, [currentChannel]);

  useEffect(() => {
    console.log(channels);
  }, [channels]);

  useEffect(() => {
    socket.removeAllListeners();
  }, []);

  useEffect(() => {
    socket.on(currentChannel?.channel, async (data) => {
      console.log("get", data);
      if (data?.message_content === "TYPING") {
        setTypeIndicator(true);
      } else if (data?.message_content === "ENDTYPING") setTypeIndicator(false);

      if (!checkMessageDictionary(data)) {
        await setMessages((prev) => [...prev, data]);
      }
    });
  }, [currentChannel]);

  useEffect(() => {
    let chatBottomElement = document.getElementById("CHAT_BOTTOM_ID");
    if (chatBottomElement && !loadedMore)
      chatBottomElement.scrollTop = chatBottomElement.scrollHeight;
  }, [chatBottom?.current?.scrollHeight, messages]);

  useEffect(() => {
    let timer;
    if (!typing) setTyping(true);
    timer = setTimeout(() => {
      setTyping(false);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [texting]);

  useEffect(() => {
    if (typing) {
      socket.emit(
        "message",
        returnEmitMessageWithDic(currentChannel, user, "TYPING")
      );
    } else
      socket.emit(
        "message",
        returnEmitMessageWithDic(currentChannel, user, "ENDTYPING")
      );
  }, [typing]);

  return (
    <div>
      <div className="flex flex-row">
        <div className="w-1/3 flex flex-col max-h-[700px] overflow-y-auto">
          {channels?.map((channel) => (
            <Button
              key={channel?.message_channel}
              label={
                channel?.message_channel?.replaceAll("_", " ").split(".")[1]
              }
              clickHandler={() =>
                switchRoom({
                  id: channel?.id,
                  receiverName: channel?.receiverName,
                  message_channel: channel?.message_channel,
                  is_active: channel?.is_active,
                  send_notifications: channel?.send_notifications,
                  firstUserId: channel?.firstUserId,
                  secondUserId: channel?.secondUserId,
                })
              }
              className="my-3"
            />
          ))}
        </div>
        <div className="w-2/3 flex flex-col px-5">
          {currentChannel?.channel ? (
            <MessageList
              chatBottom={chatBottom}
              currentChannel={currentChannel}
              getMessages={getMessages}
              initialValues={initialValues}
              messageCounter={messageCounter}
              messages={messages}
              offset={offset}
              sendMessage={sendMessage}
              setLoadedMore={setLoadedMore}
              setSentMessage={setSentMessage}
              setTexting={setTexting}
              typeIndicator={typeIndicator}
              user={user}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* <Loading loading={typeIndicator} /> */}
    </div>
  );
}

export default ChatPage;
