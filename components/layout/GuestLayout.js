import { Layout } from "antd";
import { useContext, useEffect, useState } from "react";
//import AdminNav from "../nav/AdminNav";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;

function GuestLayout({ children }) {
  //context
  const [auth, setAuth] = useContext(AuthContext);
  //state
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getCurrentGuest();
  }, [auth?.token]);

  const getCurrentGuest = async () => {
    try {
      const { data } = await axios.get("/current-guest");
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
      <h1> All Guests are welcome here..</h1>
    </Layout>
  );
}

export default GuestLayout;
