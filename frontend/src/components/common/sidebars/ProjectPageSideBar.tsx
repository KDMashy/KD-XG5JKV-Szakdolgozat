import React, { useState } from "react";
import Button from "../Button";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";
import { useRouter } from "next/router";
import { NotifyMessage } from "../ToastNotification";
import Modal from "../modal/Modal";
import AddTeamModal from "../modal/AddTeamModal";

function ProjectPageSideBar({
  onShow,
  deleteAble,
  pageData = null,
  refreshData = null,
}) {
  const router = useRouter();
  const { id } = router.query;

  const [isOpen, setIsOpen] = useState(false);

  const deleteProject = async () => {
    await axios(
      "delete",
      `${API_URL}/project/${id}`,
      null,
      null,
      (res) => {
        NotifyMessage("success", "Successfully deleted project");
        router.push("/auth/projects");
      },
      (error) =>
        NotifyMessage(
          "error",
          "Something went wrong while removing your project"
        )
    );
  };

  return (
    <div className="min-h-[175px] max-h-[200px] overflow-y-auto flex flex-col ">
      {deleteAble ? (
        <>
          <Button
            label="Csapatok kezelése"
            clickHandler={() => setIsOpen(true)}
            className={`transition-all ease-out delay-100 duration-100`}
          />
          <Button
            label="Projekt törlése"
            color="error"
            clickHandler={() => deleteProject()}
            className={`transition-all ease-out delay-100 duration-100 mt-14`}
          />
        </>
      ) : (
        <></>
      )}
      <Modal
        isOpen={isOpen}
        onSetIsOpen={setIsOpen}
        closable
        content={
          <AddTeamModal
            pageData={pageData}
            setOpenModal={setIsOpen}
            refreshData={refreshData}
          />
        }
      />
    </div>
  );
}

export default ProjectPageSideBar;
