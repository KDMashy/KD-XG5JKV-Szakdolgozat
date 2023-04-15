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

export function getIds(data) {
  let tmp = [];
  data?.map((item) => {
    tmp.push({ id: item?.id });
  });
  return tmp;
}

export const getChannelName = (currentChannel, user) => {
  if (currentChannel?.message_channel?.includes("group"))
    return currentChannel?.message_channel?.replaceAll("_", " ").split(".")[0];

  let names = currentChannel?.message_channel
    ? currentChannel?.message_channel?.split(".")[0].split(";")
    : currentChannel?.channel?.split(".")[0].split(";");
  if (names[0] === user?.username) return names[1];
  return names[0];
};

export function mergeFriendlist(user) {
  if (!user) return;
  let tmp = [];
  user?.friend_one?.map((friend) => tmp.push(checker(friend, user)));
  user?.friend_two?.map((friend) => {
    if (!tmp?.filter((item) => item?.id === friend?.id))
      tmp.push(checker(friend, user));
  });
  return tmp;
}

function checker(friend, user) {
  if (friend?.first_user?.id === user?.id) return friend?.second_user;
  return friend?.first_user;
}

export function getAvailableList(friends, members) {
  let tmp = [];
  friends?.map((item) => {
    if (!members?.filter((member) => member?.id === item?.id)[0])
      tmp.push(item);
  });
  return tmp;
}

export function getAvailableAndAddedTeams(projectTeams, teams) {
  let added = {
    project: [],
    teams: [],
  };

  if (projectTeams?.length > 0) {
    projectTeams?.map((projTeam) => {
      teams?.map((team) => {
        if (team?.id === projTeam?.id) {
          added?.project?.push(team);
        } else added?.teams?.push(team);
      });
    });
  } else added.teams = [...added.teams, ...teams];

  return added;
}
