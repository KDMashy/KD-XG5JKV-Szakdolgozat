import React, { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    let mode = localStorage.getItem("darkMode");
    if (mode) {
      if (mode === "true" && !darkMode) {
        setDarkMode(true);
      } else if (mode === "false" && darkMode) {
        setDarkMode(false);
      }
    }
    setTimeout(() => {
      setTimer(!timer);
    }, 100);
  }, [timer]);

  return { darkMode };
};
