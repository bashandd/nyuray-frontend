import { Row, Col, Button, Layout, Divider } from "antd";
import MainLayout from "../../components/layout/MainLayout";
import Dashboard from "./Dashboard";
const { Content, Sider } = Layout;

function Admin() {
  return (
    <MainLayout>
      <Row justify="end" style={{ marginTop: "10px" }}>
        <Col span={4}>
          <Button type="primary">
            <a href="javascript:history.back()">Go Back</a>
          </Button>
        </Col>
      </Row>
      {/* <h1 style={{paddingTop:"20px", paddingLeft:"40px"}}>
    This is Admin page. Super User.
  </h1> */}
  <Divider></Divider>
      <Dashboard />
    </MainLayout>
  );
}

export default Admin;
