import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Button from "../../../components/common/Button";
import { CustomInput } from "../../../components/common/form/CustomInput";
import Loading from "../../../components/common/Loading";
import { useChatContext } from "../../../contexts/ChatProvider";
import { useAuth } from "../../../hooks/useAuth";

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

  const { currentChannel, switchRoom, sendMessage, socket } = useChatContext();

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
      <div className="flex flex-row">
        <Button
          label="MashyxCyrous"
          clickHandler={() =>
            switchRoom({
              id: 2,
              message_channel: "MashyxCyrous.Cyrous",
              is_active: "true",
              send_notifications: "true",
              firstUserId: 1,
              secondUserId: 2,
            })
          }
        />
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
