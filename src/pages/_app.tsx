import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { UserContext, useUser } from "../context/authContext";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const auth = useUser();

  if (router.pathname === "/login") {
    return (
      <UserContext.Provider value={auth}>
        <Component {...pageProps} />;
      </UserContext.Provider>
    );
  } else {
    return (
      <UserContext.Provider value={auth}>
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      </UserContext.Provider>
    );
  }
};

export default MyApp;
