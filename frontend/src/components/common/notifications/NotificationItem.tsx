import React from "react";

function NotificationItem({ notification }) {
  return (
    <div className="px-3 py-2 flex flex-col transition-all ease-in-out duration-150 hover:bg-dark-600 hover:text-dark-100">
      <p className={`text-xs py-1 px-2 text-right`}>
        {new Date(notification?.updated_at).toLocaleDateString("sv-SE", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className={`text-xs py-1 px-2 break-all`}>{notification?.content}</p>
    </div>
  );
}

export default NotificationItem;
