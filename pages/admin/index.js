import { Layout } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";
const { Content, Sider } = Layout;

function Admin() {
  return (
  <AdminLayout> 
  <h1 style={{paddingTop:"20px", paddingLeft:"40px"}}>
    This is Admin page. Super User.
  </h1>
  </AdminLayout>
  );
}

export default Admin;
