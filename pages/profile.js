import { Layout, Col, Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import MainLayout from "../components/layout/MainLayout";

const { Content, Sider } = Layout;

function Profile() {
  // console.log(" I am in profile page");
  let userInfo = "";

  function getUser() {
    userInfo =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("auth"))
        : null;

    if (userInfo) {
      return userInfo.user;
    } else {
      console.log("Error in loading Profile");
    }
  }

  userInfo = getUser();
  if (userInfo) {
    return (
      <MainLayout>
        {/* <Col span={12}> */}
        <Avatar
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
          icon={<UserOutlined />}
          style={{
            color: "#eb2f96",
            backgroundColor: "#fde3cf",
            marginLeft: "550px",
            marginTop: "100px",
          }}
        />
        <Card
          title={userInfo.name}
          bordered={true}
          style={{
            width: 400,
            marginLeft: "400px",

            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <h1>Email: {userInfo.email}</h1>
          <h1>Phone: {userInfo.phone}</h1>
          <p>Role: {userInfo.role}</p>
          <p>Reports To: {userInfo.reportsTo}</p>
        </Card>
        {/* </Col> */}
      </MainLayout>
    );
  }
}

export default Profile;
