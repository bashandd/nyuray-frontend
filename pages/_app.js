import { ThemeProvider } from "../context/theme";
import { AuthProvider } from "../context/auth";
import { ReqProvider } from "../context/req";
import { ClientProvider } from "../context/client";
import { MediaProvider } from "../context/media";
import { Toaster, ToastBar } from "react-hot-toast";
import TopNav from "../components/TopNav";
import "../public/css/styles.css";

// import "antd/dist/antd.css";
// import "antd/dist/antd.dark.css";
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ClientProvider>
          <ReqProvider>
            <MediaProvider>
              <Toaster
                containerStyle={{
                  top: 200,
                  left: 200,
                  bottom: 20,
                  right: 20,
                }}
                toastOptions={{
                  success: {
                    style: {
                      padding: "50px",
                      color: "#713200",
                    },
                  },
                  error: {
                    style: {
                      //  background: "red",
                      padding: "50px",
                      color: "#713200",
                    },
                  },
                }}
              />
              <TopNav />
              <Component {...pageProps} />
            </MediaProvider>
          </ReqProvider>
        </ClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
