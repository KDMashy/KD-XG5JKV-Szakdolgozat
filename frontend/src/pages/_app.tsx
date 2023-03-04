import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-indiana-drag-scroll/dist/style.css";
import type { AppProps } from "next/app";
import Navbar from "../components/layout/Navbar";
import Content from "../components/layout/Content";
import Footer from "../components/layout/Footer";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  const toastContext = {
    default: "text-light-300 bg-primary-200",
    success: "text-light-300 bg-success-300",
    warning: "text-light-300 bg-warning-300",
    error: "text-error-200 bg-error-300",
  };

  useEffect(() => {
    let darkmode = localStorage.getItem("darkMode");
    if (!darkmode) localStorage.setItem("darkMode", "true");
  }, []);

  return (
    <>
      <Navbar />
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={({ type }) =>
          toastContext[type || "default"] +
          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer font-bold font-rubik text-[12px] px-5 py-3 my-5 md:-ml-[40%] mx-2 shadow-[0_20px_25px_6px_rgba(0,0,0,0.10)]"
        }
        icon={false}
        className={"mt-20"}
      />
    </>
  );
}

export default MyApp;
