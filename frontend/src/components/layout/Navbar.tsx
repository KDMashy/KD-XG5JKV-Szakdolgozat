import axios from "axios";
import React, { useEffect, useState } from "react";
import { LoginTypes } from "../../constants/LoginTypes";
import { navButtons } from "../../constants/NavButtons";
import { API_URL } from "../../constants/url";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { useDarkMode } from "../../hooks/useDarkMode";
import Avatar from "../common/Avatar";
import Button from "../common/Button";

function Navbar() {
  const { darkMode } = useDarkMode();

  const router = useRouter();

  const { user, logout } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: false,
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const MenuButtons = () => {
    if (!user) {
      return navButtons.map((button, index) => {
        if (button?.type === LoginTypes.No_Login)
          return (
            <Button
              key={index}
              label={button?.label}
              route={button?.url}
              type={darkMode ? "dark" : "light"}
              buttonType="menu_nolog"
            />
          );
      });
    } else {
      return navButtons.map((button, index) => {
        if (button?.type === LoginTypes.Login)
          return (
            <Button
              key={index}
              label={button?.label}
              route={button?.url}
              type={darkMode ? "dark" : "light"}
              buttonType="menu_log"
              clickHandler={
                button?.label === "Logout" ? () => logout() : () => {}
              }
            />
          );
      });
    }
  };

  return (
    <header
      className={`flex justify-between ${
        !user
          ? "py-7 pl-7"
          : `px-2 h-[180px] overflow-hidden mb-10 ${
              darkMode ? "bg-dark-700 bg-opacity-30 text-light-400" : ""
            }`
      }`}
    >
      <>
        {!user ? (
          <>
            <Avatar width="w-[130px]" height="w-[130px]" circular route="/" />
            <div className="2xl:w-[100vh] xl:w-[90vh] lg:w-[80vh] w-[70vh] bg-dark-100 xl:pl-24 xl:pr-8 pl-20 pr-5 max-h-[80px] rounded-tl-[50px] rounded-bl-[200px] flex items-center justify-between">
              {MenuButtons()}
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full">
            <div className="h-[40px] mb-10 flex justify-between">
              <div className="h-[40px] w-[330px] bg-dark-100 pl-3 rounded-br-[20px]">
                <h1 className="text-lg font-noto font-bold -mt-1">
                  {user?.username} - {`${user?.first_name} ${user?.last_name}`}
                </h1>
                <h2 className="font-noto font-semibold -mt-2">{user?.email}</h2>
              </div>
              <div className="h-[40px] w-[400px] bg-dark-100 rounded-bl-[20px] font-noto text-lg font-bold text-center items-center flex justify-center">
                NOTIFICATIONS PLACEHOLDER
              </div>
            </div>
            <div className="flex justify-between mb-5">{MenuButtons()}</div>
          </div>
        )}
      </>
    </header>
  );
}

export default Navbar;
