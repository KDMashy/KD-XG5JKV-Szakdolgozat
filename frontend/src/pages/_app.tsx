import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/layout/Navbar";
import Content from "../components/layout/Content";
import Footer from "../components/layout/Footer";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let darkmode = localStorage.getItem("darkMode");
    if (!darkmode) localStorage.setItem("darkMode", "true");
  }, []);

  return (
    <div>
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
