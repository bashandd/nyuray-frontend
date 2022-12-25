import { Layout } from "antd";
import { useContext, useEffect, useState } from "react";
import MainNav from "../nav/MainNav";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;

function MainLayout({ children }) {
  //context
  const [auth, setAuth] = useContext(AuthContext);
  //state
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // if (auth?.user?.role !== "Admin") {
    //   router.push("/");
    // } else {
    //   setLoading(false);
    // }
    if (auth?.token) {
      getCurrentUser();
    }
  }, [auth?.token]);

  const getCurrentUser = async () => {
    //console.log ("getCurrentAdmin");
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      // console.log ("user",auth.user );
      // const userId = auth.user._id;
      // console.log ("id",userId );
      // const { data } = await axios.get("/current-user", {
      //   _id: auth.user._id,
      // });
      // console.log ("data", data);
      if (auth.user.role !== "Guest"){
        setLoading(false);
      }
      
      // console.log (data);
      // console.log (data.err);
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };

  if (loading) {
    return (
      <LoadingOutlined
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "60px",
          color: "red",
        }}
      />
    );
  }

  return (
    <Layout>
      <MainNav />
      <Layout>
        <Content style={{ padding: "10px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
