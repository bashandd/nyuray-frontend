import { Layout } from "antd";
import SpocLayout from "../../components/layout/SpocLayout";
const { Content, Sider } = Layout;

function SpocAssignedJobs() {
  
  return (
    <SpocLayout>
      <h1 style={{ paddingTop: "20px", paddingLeft: "40px" }}>
        Display SPOC assgined jobs here
      </h1>
    </SpocLayout>
  );
}

export default SpocAssignedJobs;
