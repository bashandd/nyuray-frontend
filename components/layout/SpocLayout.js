import { Layout } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import SpocNav from "../nav/SpocNav";

const { Content } = Layout;

function SpocLayout({ children }) {
  console.log ("I am here in SpocLayout");
  //context
  const [auth, setAuth] = useContext(AuthContext);
  //state
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getCurrentSpoc();
  }, [auth?.token]);

  const getCurrentSpoc = async () => {
    try {
      const { data } = await axios.get("/current-spoc");
      setLoading(false);
      console.log(data);
      console.log(data.err);
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
      <SpocNav />
      <Layout>
        <Content style={{ padding: "10px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default SpocLayout;
