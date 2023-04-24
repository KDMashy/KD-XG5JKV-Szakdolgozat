import React from "react";
import Button from "../Button";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { getChannelName } from "../../../helpers/Helpers";

function MessageList({
  currentChannel,
  chatBottom,
  messageCounter,
  offset,
  getMessages,
  messages,
  typeIndicator,
  user,
  initialValues,
  sendMessage,
  setLoadedMore,
  setSentMessage,
  setTexting,
}) {
  return (
    <div className="h-[600px] flex flex-col justify-between">
      <h2>{getChannelName(currentChannel, user)}</h2>
      <div
        className="flex flex-col h-[500px] overflow-y-auto border-2 border-light-300 py-5 rounded-md"
        ref={chatBottom}
        id="CHAT_BOTTOM_ID"
      >
        {messageCounter > offset ? (
          <div className="flex items-center justify-center mx-auto">
            <Button
              label="Load more"
              className="px-5 py-1"
              clickHandler={async () => {
                getMessages();
              }}
            />
          </div>
        ) : (
          <></>
        )}
        {messages?.map((item) => (
          <Message
            key={`${item?.id}${item?.updated_at}`}
            item={item}
            user={user}
          />
        ))}
      </div>
      <div className="relative">
        <div className="absolute left-3 -top-[70px] z-100">
          {typeIndicator && (
            <div className="flex justify-start w-[300px] items-center">
              <p className="text-xs text-light-200">Typing...</p>
              <img
                src="/assets/images/hamsterLoad.gif"
                alt="Hamster load"
                className="w-[65%]"
              />
            </div>
          )}
        </div>
        <MessageInput
          currentChannel={currentChannel}
          initialValues={initialValues}
          sendMessage={sendMessage}
          setLoadedMore={setLoadedMore}
          setSentMessage={setSentMessage}
          setTexting={setTexting}
          user={user}
        />
      </div>
    </div>
  );
}

export default MessageList;
