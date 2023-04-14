import React, { useEffect, useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Button from "../Button";
import Container from "../../Container";
import ProjectPageSideBar from "./ProjectPageSideBar";
import TeamPageSideBar from "./TeamMemberSideBar";

function SideBar({
  darkMode,
  hidden,
  hideTimer,
  setHideTimer,
  setHidden,
  containerClassName = "",
  page = "project",
  setOpenModal = null,
}) {
  const [hideStart, setHideStart] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [showData, setShowData] = useState(false);
  const [onShow, setOnShow] = useState(false);

  useEffect(() => {
    if (hideTimer)
      setTimeout(() => {
        setHideTimer(false);
        setHideStart(false);
        setShowClose(false);
        setShowData(false);
      }, 100);
  }, [hideTimer]);

  useEffect(() => {
    if (!hidden)
      setTimeout(() => {
        setShowClose(true);
      }, 10);
  }, [hidden]);

  useEffect(() => {
    if (showClose) setShowData(true);
  }, [showClose]);

  useEffect(() => {
    if (showData)
      setTimeout(() => {
        setOnShow(true);
      }, 100);
    if (!showData) setOnShow(false);
  }, [showData]);

  function GetPageSideBar() {
    switch (page) {
      case "project":
        return <ProjectPageSideBar onShow={onShow} />;
      case "team":
        return <TeamPageSideBar onShow={onShow} setOpenModal={setOpenModal} />;
    }
  }

  return (
    <Container
      type={darkMode ? "dark" : "light"}
      className={`${
        hidden
          ? `w-[0px] transition-all ease-in-out delay-75 ${
              hideTimer && containerClassName
            }`
          : `w-full transition-all ease-in-out delay-75 ${containerClassName}`
      } max-h-[300px] overflow-y-scroll`}
      padding={`${hidden ? "" : "p-6"}`}
    >
      <div className={`${hidden ? "" : ""}`}>
        <div
          onClick={() => setHidden(false)}
          className={`${!hidden && !setHideTimer && "hidden"}`}
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
            setHidden(true);
            setHideTimer(true);
            setHideStart(true);
          }}
          className={`${
            !showClose || (hidden && setHideTimer && !hideStart) ? "hidden" : ""
          }`}
        >
          <KeyboardDoubleArrowLeftIcon
            className={`absolute top-[10px] ${
              hidden ? "left-2" : "left-[220px]"
            } bg-light-200 text-light-400 rounded-full hover:bg-light-400 hover:text-light-200 transition-all ease-in-out delay-100`}
            fontSize="large"
          />
        </div>
      </div>
      {showData && (
        <div className={` transition-all ease-in-out delay-100 relative pt-8`}>
          {GetPageSideBar()}
        </div>
      )}
    </Container>
  );
}

export default SideBar;
