import React, { useState, useRef, useEffect } from "react";
import { FoxImage } from "../FoxImage";
import NotificationItem from "./NotificationItem";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";
import { getIds } from "../../../helpers/Helpers";

function NotificationDropdown({ notifications }) {
  const [notiOpen, setNotiOpen] = useState(false);
  const ref = useRef(null);
  const openRef = useRef(null);

  const removeNotifications = async () => {
    if (!notifications || notifications?.length === 0) return;
    await axios("delete", `${API_URL}/chat/delete-multiple-notification`, {
      notifications: getIds(notifications),
    });
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (notiOpen && openRef.current && !openRef.current.contains(e.target)) {
        setNotiOpen(false);
      }
    };

    if (notiOpen) {
      document.addEventListener("click", checkIfClickedOutside);
    } else {
      removeNotifications();
      document.removeEventListener("click", checkIfClickedOutside);
    }

    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [notiOpen]);

  return (
    <div
      className={`transition-all ease-in-out hover:bg-dark-200 hover:bg-opacity-40 px-3 rounded-xl duration-150 hover:cursor-pointer relative`}
      onClick={() => setNotiOpen(!notiOpen)}
      ref={openRef}
    >
      <NotificationIndicator has={notifications?.length > 0 ? true : false} />
      <div
        className={`absolute top-10 right-0 z-100 ${
          notiOpen
            ? "min-h-[40px] max-h-[300px] w-[200px]"
            : "min-h-0 max-h-0 w-0"
        } rounded-l-xl rounded-br-xl bg-dark-100 transition-all ease-in-out duration-150 overflow-y-auto`}
        ref={ref}
      >
        {notifications?.length > 0 ? (
          notifications?.map((notification) => (
            <NotificationItem
              notification={notification}
              key={`${notification?.id}${notification?.updated_at}`}
            />
          ))
        ) : (
          <p className={`text-[rgb(40,60,105)] text-sm text-center py-2 px-1`}>
            No notifications right now...
          </p>
        )}
      </div>
    </div>
  );
}

export default NotificationDropdown;

const NotificationIndicator = ({ has }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <FoxImage
        color={has ? "rgb(40,120,105)" : "rgb(40,60,105)"}
        width="25"
        height="40"
      />
      <p
        className={`ml-3 ${
          has ? "text-[rgb(40,120,105)]" : "text-[rgb(40,60,105)]"
        }`}
      >
        Notifications
      </p>
    </div>
  );
};
