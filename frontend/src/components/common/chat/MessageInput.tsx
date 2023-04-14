import { Formik } from "formik";
import React from "react";
import CustomForm from "../form/CustomForm";
import { CustomInput } from "../form/CustomInput";
import Button from "../Button";

function MessageInput({
  initialValues,
  setLoadedMore,
  setTexting,
  setSentMessage,
  sendMessage,
  currentChannel,
  user,
}) {
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values, setFieldValue }) => {
        return (
          <CustomForm
            handleSubmit={() => {
              sendMessage(
                {
                  message: values?.message,
                  channel: currentChannel?.channel,
                  sender: user?.username,
                },
                setFieldValue
              );
              setLoadedMore(false);
              setTexting("");
              setSentMessage(true);
            }}
            className="flex w-full justify-between"
          >
            <div className="w-[65%]">
              <CustomInput
                placeholder="Írja ide az üzenetét"
                value={values?.message}
                onChange={(e) => {
                  setTexting(e?.target?.value);
                  setFieldValue("message", e?.target?.value);
                }}
              />
            </div>
            <div className="w-[30%] flex justify-end items-center">
              <div>
                <Button
                  label="Üzenet elküldése"
                  clickHandler={() => {
                    sendMessage(
                      {
                        message: values?.message,
                        channel: currentChannel?.channel,
                        sender: user?.username,
                      },
                      setFieldValue
                    );
                    setLoadedMore(false);
                    setTexting("");
                    setSentMessage(true);
                  }}
                />
              </div>
            </div>
          </CustomForm>
        );
      }}
    </Formik>
  );
}

export default MessageInput;
