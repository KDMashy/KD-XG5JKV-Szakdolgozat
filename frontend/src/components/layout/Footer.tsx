import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "../common/Avatar";
import Button from "../common/Button";

function Footer() {
  const [darkMode, setDarkMode] = useState<Boolean | any>(null);

  const { user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      if (darkMode === true) {
        localStorage.setItem("darkMode", "true");
        setDarkMode(true);
      } else if (darkMode === false) {
        localStorage.setItem("darkMode", "false");
        setDarkMode(false);
      } else {
        localStorage.setItem("darkMode", "true");
        setDarkMode(true);
      }
    }
  }, [darkMode]);

  return !user ? (
    <footer
      className={`relative w-full h-[180px] mt-20 ${
        darkMode ? "bg-dark-700" : "bg-dark-200"
      }`}
    >
      <div className="flex items-center h-full px-5">
        <Avatar width="w-[130px]" height="h-[130px]" circular route="/" />
        <div className="flex flex-col ml-10 pt-2">
          <span
            className={`h-[50px] ${
              darkMode
                ? "bg-dark-700 text-dark-200"
                : "bg-dark-200 text-light-400"
            }`}
          >
            Links
          </span>
          <span
            className={`h-[50px] ${
              darkMode
                ? "bg-dark-700 text-dark-200"
                : "bg-dark-200 text-light-400"
            }`}
          >
            CopyRight
          </span>
          <Button
            label={darkMode ? "Dark mode" : "Light mode"}
            clickHandler={() => setDarkMode(!darkMode)}
            type={darkMode ? "dark" : "light"}
            color="switch"
          />
        </div>
      </div>
    </footer>
  ) : (
    <></>
  );
}

export default Footer;
