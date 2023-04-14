import React from "react";
import Button from "../Button";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";
import { useRouter } from "next/router";
import { NotifyMessage } from "../ToastNotification";

function TeamPageSideBar({ onShow, setOpenModal }) {
  const router = useRouter();
  const { id } = router.query;

  const deleteTeam = async () => {
    await axios(
      "delete",
      `${API_URL}/team/${id}`,
      null,
      null,
      (res) => {
        NotifyMessage("success", "Successfully deleted Team");
        router.push("/auth/teams");
      },
      (error) =>
        NotifyMessage("error", "Something went wrong while removing your Team")
    );
  };

  return (
    <div className="min-h-[175px] max-h-[200px] overflow-y-scroll">
      <Button
        label="Új csapattagok hozzáadása"
        clickHandler={() => setOpenModal(true)}
        className={`absolute ${
          onShow ? "left-0" : "-left-72"
        } transition-all ease-out delay-100 duration-100`}
      />
      <Button
        label="Csapat törlése"
        color="error"
        clickHandler={() => deleteTeam()}
        className={`absolute ${
          onShow ? "left-0" : "-left-72"
        } transition-all ease-out delay-100 duration-100 top-32`}
      />
    </div>
  );
}

export default TeamPageSideBar;
