import { Router } from "next/router";
import "../styles/globals.css";
import NProgress from "nprogress";
import "lib/nprogress.css";
import { useEffect } from "react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
