import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import { CustomInput } from "../../../components/common/form/CustomInput";
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

  const { currentChannel, setCurrentChannel, sendMessage } = useChatContext();

  return (
    <div>
      <div className="flex flex-row">
        <Button
          label="sabalabadu"
          clickHandler={() =>
            setCurrentChannel({
              username: user?.username,
              channel: "sabalabadu",
            })
          }
        />
        <Button
          label="sadge"
          clickHandler={() =>
            setCurrentChannel({
              username: user?.username,
              channel: "sadge",
            })
          }
        />
        {currentChannel?.channel && (
          <Formik initialValues={initialValues} onSubmit={() => {}}>
            {({ values, setFieldValue }) => {
              return (
                <>
                  <CustomInput
                    value={values?.message}
                    onChange={(e) => setFieldValue("message", e?.target?.value)}
                  />
                  <Button
                    label="Send message"
                    clickHandler={() =>
                      sendMessage(
                        {
                          message: values?.message,
                          channel: currentChannel?.channel,
                          sender: user?.username,
                        },
                        setFieldValue
                      )
                    }
                  />
                </>
              );
            }}
          </Formik>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
