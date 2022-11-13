import React, { useState } from "react";
import Avatar from "../common/Avatar";

function Footer() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <footer
      className={`fixed bottom-0 w-full h-[180px] ${
        darkMode ? "bg-dark-700" : "bg-light-400"
      }`}
    >
      <div className="flex items-center h-full px-5">
        <Avatar width="w-[130px]" height="h-[130px]" circular route="/" />
        <div className="flex flex-col ml-10">
          <span className="h-[65px]">Links</span>
          <span className="h-[65px]">CopyRight</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
