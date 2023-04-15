import React from "react";
import Button from "../Button";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";
import { NotifyMessage } from "../ToastNotification";

function TeamMemberItem({
  id,
  memberId,
  username,
  email,
  members,
  setMembers,
  teamData,
  newlyAdded,
  deleteAble = false,
}) {
  const removeTeamMember = async () => {
    await axios(
      "put",
      `${API_URL}/team/remove-member`,
      {
        member: memberId,
        team: teamData?.id,
      },
      null,
      (res) => {
        NotifyMessage("success", "Successfully removed team member");
        let tmp = members?.filter((item) => item?.id !== memberId);
        setMembers(tmp);
      },
      (error) => NotifyMessage("error", "Couldn't remove team member")
    );
  };

  return (
    <div className="w-full px-5 py-3 border-2 border-dark-200 border-opacity-30 bg-light-600 h-[80px] max-h-[80px] overflow-y-auto rounded-md my-3 text-light-400 flex items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">{username}</h2>
        <p className="text-lg font-semibold">{email}</p>
      </div>
      {newlyAdded?.filter((item) => item?.username === username)[0] ? (
        <></>
      ) : deleteAble ? (
        <Button
          label="Törlés a csapatból"
          color="error"
          clickHandler={() => removeTeamMember()}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default TeamMemberItem;
