import React from "react";
import Button from "../Button";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";
import { useRouter } from "next/router";
import { NotifyMessage } from "../ToastNotification";

function TeamPageSideBar({ onShow, setOpenModal, deleteAble }) {
  const router = useRouter();
  const { id } = router.query;

  const deleteTeam = async () => {
    await axios(
      "delete",
      `${API_URL}/team/${id}`,
      null,
      null,
      (res) => {
        NotifyMessage("success", "Sikeresen törölted a csapatod");
        router.push("/auth/teams");
      },
      (error) =>
        NotifyMessage(
          "error",
          "Valami hiba történt",
          "A csapat törlése nem lehetséges"
        )
    );
  };

  return (
    <div className="min-h-[175px] max-h-[200px] overflow-y-auto flex flex-col">
      {deleteAble ? (
        <>
          <Button
            label="Új csapattagok hozzáadása"
            clickHandler={() => setOpenModal(true)}
            className={` transition-all ease-out delay-100 duration-100`}
          />
          <Button
            label="Csapat törlése"
            color="error"
            clickHandler={() => deleteTeam()}
            className={` transition-all ease-out delay-100 duration-100 mt-14`}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TeamPageSideBar;
