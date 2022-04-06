import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { UserProvider } from "../context/authContext";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  if (router.pathname === "/login") {
    return (
      <UserProvider>
        <Component {...pageProps} />;
      </UserProvider>
    );
  } else {
    return (
      <UserProvider>
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      </UserProvider>
    );
  }
};

export default MyApp;
