import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/layout/Navbar";
import Content from "../components/layout/Content";
import Footer from "../components/layout/Footer";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);

  const darkModeClass = "bg-dark-800";
  const lightModeClass = "bg-light-100";

  return (
    <div
      className={`${
        darkMode ? darkModeClass : lightModeClass
      } relative font-noto`}
    >
      <Navbar />
      <Content>
        <Component {...pageProps} />
      </Content>
      <div className="h-[180px] mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default MyApp;
