import { Row,Col, Button, Layout } from "antd";
import MainLayout from "../../components/layout/MainLayout";
const { Content, Sider } = Layout;

function Recruiter() {
  return (
    <MainLayout>
      <Row justify="end" style={{ marginTop: "10px" }}>
        <Col span={4}>
          <Button type="primary">
            <a href="javascript:history.back()">Go Back</a>
          </Button>
        </Col>
      </Row>
      <h1 style={{ paddingTop: "20px", paddingLeft: "40px" }}>
        This is Recruiter Dashboard page.
      </h1>
    </MainLayout>
  );
}

export default Recruiter;
