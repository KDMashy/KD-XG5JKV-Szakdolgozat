import React from "react";
import Button from "../Button";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";
import { useRouter } from "next/router";
import { NotifyMessage } from "../ToastNotification";

function ProjectPageSideBar({ onShow }) {
  const router = useRouter();
  const { id } = router.query;

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
    <div className="min-h-[175px] max-h-[200px] overflow-y-scroll">
      <Button
        label="Projekt törlése"
        color="error"
        clickHandler={() => deleteProject()}
        className={`absolute ${
          onShow ? "left-0" : "-left-72"
        } transition-all ease-out delay-100 duration-100`}
      />
    </div>
  );
}

export default ProjectPageSideBar;
