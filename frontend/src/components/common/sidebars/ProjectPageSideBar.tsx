import React from "react";
import Button from "../Button";

function ProjectPageSideBar({ onShow }) {
  return (
    <div className="min-h-[175px] max-h-[200px] overflow-y-scroll">
      <Button
        label="test 1"
        className={`absolute ${
          onShow ? "left-0" : "-left-72"
        } transition-all ease-out delay-100 duration-100`}
      />
      <Button
        label="test 2"
        className={`absolute ${
          onShow ? "ml-0" : "-ml-72"
        } transition-all ease-out delay-200 duration-100 top-24`}
      />
      <Button
        label="test 3"
        className={`absolute ${
          onShow ? "ml-0" : "-ml-72"
        } transition-all ease-out delay-300 duration-100 top-40`}
      />
    </div>
  );
}

export default ProjectPageSideBar;
