import { Layout } from "antd";
import MainLayout from "../../components/layout/MainLayout";
const { Content, Sider } = Layout;

function Admin() {
  return (
  <MainLayout> 
  <h1 style={{paddingTop:"20px", paddingLeft:"40px"}}>
    This is Admin page. Super User.
  </h1>
  </MainLayout>
  );
}

export default Admin;
