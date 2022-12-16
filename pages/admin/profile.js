import { Layout } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";
const { Content, Sider } = Layout;

function AdminProfile() {
  return <AdminLayout> 
  <h1>
    Admin profile will be displayed here
  </h1>
  </AdminLayout>;
}

export default AdminProfile;
