import React from "react";
import Button from "../Button";
import { getChannelName } from "../../../helpers/Helpers";
import CancelIcon from "@mui/icons-material/Cancel";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";
import { NotifyMessage } from "../ToastNotification";
import { useChatContext } from "../../../contexts/ChatProvider";

function ChannelTab({ channel, switchRoom, user, getChannels }) {
  const removeFriend = async (channel) => {
    await axios(
      "post",
      `${API_URL}/user/remove-friend`,
      {
        friend:
          user?.id !== channel?.secondUserId
            ? channel?.secondUserId
            : channel?.firstUserId,
        channel: channel?.id,
      },
      null,
      (res) => {
        NotifyMessage("success", "Sikeresen törölve lett az ismerős");
        getChannels();
        switchRoom({
          id: "default",
          name: "Loading Channels...",
          // description: "This is the default channel",
          eTag: "",
          updated: "",
        });
      },
      (error) =>
        NotifyMessage(
          "error",
          "Valami hiba történt törlés közben",
          "Nem lehetséges törölni az ismerőst"
        )
    );
  };

  return (
    <div className="w-full flex justify-between items-center px-5 py-2 border-t-2 border-b-2 border-dark-200 border-opacity-30 relative">
      {!channel?.message_channel?.split(".")[1]?.includes("group") ? (
        <div className="absolute top-2 left-3">
          <Button
            icon={<CancelIcon />}
            circular
            color="error"
            clickHandler={() => removeFriend(channel)}
          />
        </div>
      ) : (
        <></>
      )}
      <Button
        key={channel?.message_channel}
        label={getChannelName(channel, user)}
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
        className="my-3 w-full"
      />
    </div>
  );
}

export default ChannelTab;
