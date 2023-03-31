import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Button from "../../../components/common/Button";
import { CustomInput } from "../../../components/common/form/CustomInput";
import Loading from "../../../components/common/Loading";
import { useChatContext } from "../../../contexts/ChatProvider";
import { useAuth } from "../../../hooks/useAuth";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";

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
              message_channel: item?.message_channel,
              is_active: item?.is_active,
              send_notifications: item?.send_notifications,
              firstUserId: item?.first_user?.id,
              secondUserId: item?.second_user?.id,
            });
        });
        setChannels(tmp);
      },
      null,
      () => setLoading(false)
    );
  };

  useEffect(() => {
    getChannels();
  }, []);

  useEffect(() => {
    console.log(channels);
  }, [channels]);

  useEffect(() => {
    socket.removeAllListeners();
  }, []);

  useEffect(() => {
    socket.on(currentChannel?.channel, (data) => {
      console.log("get", data);
      if (data?.message_content === "TYPING") {
        setTypeIndicator(true);
      } else if (data?.message_content === "ENDTYPING") setTypeIndicator(false);
    });
  }, [currentChannel]);

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
      socket.emit("message", {
        channelId: currentChannel?.id,
        senderId: user?.id,
        message_content: "TYPING",
        channel: currentChannel?.channel,
        sender: user?.username,
        is_active: currentChannel?.is_active,
        send_notifications: currentChannel?.send_notifications,
        firstUserId: currentChannel?.firstUserId,
        secondUserId: currentChannel?.secondUserId,
      });
    } else
      socket.emit("message", {
        channelId: currentChannel?.id,
        senderId: user?.id,
        message_content: "ENDTYPING",
        channel: currentChannel?.channel,
        sender: user?.username,
        is_active: currentChannel?.is_active,
        send_notifications: currentChannel?.send_notifications,
        firstUserId: currentChannel?.firstUserId,
        secondUserId: currentChannel?.secondUserId,
      });
  }, [typing]);

  return (
    <div>
      <div className="flex flex-col">
        {channels?.map((channel) => (
          <Button
            key={channel?.message_channel}
            label={channel?.message_channel?.replaceAll("_", " ").split(".")[1]}
            clickHandler={() =>
              switchRoom({
                id: channel?.id,
                message_channel: channel?.message_channel,
                is_active: channel?.is_active,
                send_notifications: channel?.send_notifications,
                firstUserId: channel?.firstUserId,
                secondUserId: channel?.secondUserId,
              })
            }
          />
        ))}

        <Button label="sadge" clickHandler={() => switchRoom("sadge")} />
        {currentChannel?.channel && (
          <Formik initialValues={initialValues} onSubmit={() => {}}>
            {({ values, setFieldValue }) => {
              return (
                <>
                  <CustomInput
                    value={values?.message}
                    onChange={(e) => {
                      setTexting(e?.target?.value);
                      setFieldValue("message", e?.target?.value);
                    }}
                  />
                  <Button
                    label="Send message"
                    clickHandler={() => {
                      sendMessage(
                        {
                          message: values?.message,
                          channel: currentChannel?.channel,
                          sender: user?.username,
                        },
                        setFieldValue
                      );
                      setTexting("");
                      setSentMessage(true);
                    }}
                  />
                </>
              );
            }}
          </Formik>
        )}
      </div>
      <Loading loading={typeIndicator} />
    </div>
  );
}

export default ChatPage;
