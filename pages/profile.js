import { Layout, Card } from "antd";
import MainLayout from "../components/layout/MainLayout";
const { Content, Sider } = Layout;


function Profile() {
  // console.log(" I am in profile page");
  let userInfo = "";

  function getUser() {
    userInfo = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("auth")): null;

    if (userInfo) {
      return userInfo.user;
    } else {
      console.log("Error in loading Profile");
    }
  }

  userInfo = getUser();
if (userInfo){
  return (
    <MainLayout>
     
        <Card
          title="Profile"
           bordered={true}
          style={{ align: "center", width: 300 }}
        >
          <h1>Name: {userInfo.name}</h1>
          <h1>Email: {userInfo.email}</h1>
          <h1>Phone: {userInfo.phone}</h1>
          <p>Role: {userInfo.role}</p>
          <p>Reports To: {userInfo.reportsTo}</p>
         
        </Card>

    </MainLayout>
  );
}
  
}

export default Profile;
