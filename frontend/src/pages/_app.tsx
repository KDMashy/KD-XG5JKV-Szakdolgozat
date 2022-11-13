import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);

  const darkModeClass = "bg-dark-800 h-[100vh]";
  const lightModeClass = "bg-light-100 h-[100vh]";

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
      <Footer />
    </div>
  );
}

export default MyApp;
