import { Router } from "next/router";
import "../styles/globals.css";
import NProgress from "nprogress";
import "lib/nprogress.css";
import { useEffect } from "react";
import Script from "next/script";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
  }, []);
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >{`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GA_ID}');`}</Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
