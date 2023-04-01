const ChatResponses = {
  REPORTED: "REPORTED",
  EDITED: "EDITED",
  DELETED: "DELETED",
  READED: "READED",
  CONFLICT: "CONFLICT",
  NEED_MODERATION: "NEED_MODERATION",
  CONNECT: "CONNECT",
  DISCONNECT: "DISCONNECT",
  TYPING: "TYPING",
  ENDTYPING: "ENDTYPING",
};

export function checkMessageDictionary(data) {
  let found = false;
  Object.keys(ChatResponses).map((response) => {
    if (ChatResponses[response] === data?.message_content && !found)
      found = true;
  });
  return found;
}

export function returnEmitMessageWithDic(currentChannel, user, content) {
  return {
    channelId: currentChannel?.id,
    senderId: user?.id,
    message_content: content,
    channel: currentChannel?.channel,
    sender: user?.username,
    is_active: currentChannel?.is_active,
    send_notifications: currentChannel?.send_notifications,
    firstUserId: currentChannel?.firstUserId,
    secondUserId: currentChannel?.secondUserId,
  };
}
