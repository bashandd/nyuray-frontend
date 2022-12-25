import { Layout } from "antd";
import MainLayout from "../components/layout/MainLayout";
const { Content, Sider } = Layout;

function Dashboard() {
  return (
  <MainLayout> 
  <h1 style={{paddingTop:"20px", paddingLeft:"40px"}}>
    This is Dashboard page.
  </h1>
  </MainLayout>
  );
}

export default Dashboard;
