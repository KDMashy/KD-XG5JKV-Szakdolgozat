import React from "react";

function Message({ item, user }) {
  return (
    <div
      className={`my-3 ${
        item?.sender?.id === user?.id ||
        item?.senderId === user?.id ||
        item?.sender === user?.id
          ? ""
          : ""
      } px-5 text-light-200`}
    >
      <p
        className={`${
          item?.sender?.id === user?.id ||
          item?.senderId === user?.id ||
          item?.sender === user?.id
            ? "text-right"
            : "text-left"
        } text-sm font-semibold px-2`}
      >
        {item?.sender?.username ?? item?.sender}
      </p>
      <p
        className={`${
          item?.sender?.id === user?.id ||
          item?.senderId === user?.id ||
          item?.sender === user?.id
            ? "text-right"
            : "text-left"
        } text-xs py-1 px-2`}
      >
        {new Date(item?.updated_at).toLocaleDateString("sv-SE", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <div
        className={`${
          item?.sender?.id === user?.id ||
          item?.senderId === user?.id ||
          item?.sender === user?.id
            ? "bg-light-400 float-right"
            : "bg-dark-300 float-left"
        } text-light-200 max-w-[300px] p-2 rounded-md`}
      >
        {item?.message_content}
      </div>
    </div>
  );
}

export default Message;
