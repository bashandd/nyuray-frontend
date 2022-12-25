import { Layout } from "antd";
import RecruiterLayout from "../../components/layout/RecruiterLayout";
import MainLayout from "../../components/layout/MainLayout";
const { Content, Sider } = Layout;

function Recruiter() {
  return (
  <MainLayout> 
  <h1 style={{paddingTop:"20px", paddingLeft:"40px"}}>
    This is Recruiter page.
  </h1>
  </MainLayout>
  );
}

export default Recruiter;
