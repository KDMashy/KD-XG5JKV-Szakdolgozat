import { Html, Head, Main, NextScript } from "next/document";
import { useState, useEffect } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

const Document = () => {
  const { darkMode } = useDarkMode();

  return (
    <Html>
      <Head />
      <body
        className={`${
          darkMode ? "bg-dark-800" : "bg-light-100"
        } relative font-noto`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
