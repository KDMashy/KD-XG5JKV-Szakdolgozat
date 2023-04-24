import React, { useEffect, useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Button from "../Button";
import Container from "../../Container";
import ProjectPageSideBar from "./ProjectPageSideBar";
import TeamPageSideBar from "./TeamMemberSideBar";

function SideBar({
  darkMode,
  deleteAble = false,
  containerClassName = "",
  page = "project",
  setOpenModal = null,
  pageData = null,
  refreshData = null,
}) {
  const [showData, setShowData] = useState(true);

  function GetPageSideBar() {
    switch (page) {
      case "project":
        return (
          <ProjectPageSideBar
            onShow={showData}
            deleteAble={deleteAble}
            pageData={pageData}
            refreshData={refreshData}
          />
        );
      case "team":
        return (
          <TeamPageSideBar
            onShow={showData}
            deleteAble={deleteAble}
            setOpenModal={setOpenModal}
          />
        );
    }
  }

  return (
    <Container
      type={darkMode ? "dark" : "light"}
      className={`w-full transition-all ease-in-out delay-75 ${containerClassName} max-h-[400px] overflow-y-auto`}
      padding={`${!showData ? "" : "p-6"}`}
    >
      <h2 className="mx-auto text-center text-lg font-semibold -mt-3 mb-3 text-light-200">
        Funkciók
      </h2>
      {/* <div className={`${!showData ? "" : ""}`}>
        <div
          onClick={() => setShowData(false)}
          className={`${!showData && "hidden"}`}
        >
          <KeyboardDoubleArrowRightIcon
            className={`absolute top-[10px] ${
              hidden ? "left-2" : "left-[220px]"
            } bg-light-200 text-light-400 rounded-full hover:bg-light-400 hover:text-light-200 transition-all ease-in-out delay-100`}
            fontSize="large"
          />
        </div>
        <div
          onClick={() => {
            setShowData(false);
          }}
          className={`${!showData ? "hidden" : ""}`}
        >
          <KeyboardDoubleArrowLeftIcon
            className={`absolute top-[10px] ${
              hidden ? "left-2" : "left-[220px]"
            } bg-light-200 text-light-400 rounded-full hover:bg-light-400 hover:text-light-200 transition-all ease-in-out delay-100`}
            fontSize="large"
          />
        </div>
      </div> */}
      {showData && (
        <div className={` transition-all ease-in-out delay-100 relative pt-8`}>
          {GetPageSideBar()}
        </div>
      )}
    </Container>
  );
}

export default SideBar;
