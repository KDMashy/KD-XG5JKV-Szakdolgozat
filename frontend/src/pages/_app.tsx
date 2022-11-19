import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/layout/Navbar";
import Content from "../components/layout/Content";
import Footer from "../components/layout/Footer";

function MyApp({ Component, pageProps }: AppProps) {
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
