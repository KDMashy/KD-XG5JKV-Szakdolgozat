import React, { useState } from "react";
import { LoginTypes } from "../../constants/LoginTypes";
import { navButtons } from "../../constants/NavButtons";
import Avatar from "../common/Avatar";
import Button from "../common/Button";

function Navbar() {
  const [login, setLogin] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const MenuButtons = () => {
    if (!login) {
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
            />
          );
      });
    }
  };

  return (
    <header className="flex justify-between py-7 pl-7">
      {!login ? (
        <>
          <Avatar width="w-[130px]" height="w-[130px]" circular route="/" />
          <div className="2xl:w-[100vh] xl:w-[90vh] lg:w-[80vh] w-[70vh] bg-dark-100 xl:pl-24 xl:pr-8 pl-20 pr-5 max-h-[80px] rounded-tl-[50px] rounded-bl-[200px] flex items-center justify-between">
            {MenuButtons()}
          </div>
        </>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Navbar;
