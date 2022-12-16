import { Layout } from "antd";
import SpocLayout from "../../components/layout/SpocLayout";
const { Content, Sider } = Layout;

function VendorAssginedJobs() {
  
  return (
    <SpocLayout>
      <h1 style={{ paddingTop: "20px", paddingLeft: "40px" }}>
        Display Vendor assgined jobs here
      </h1>
    </SpocLayout>
  );
}

export default VendorAssginedJobs;
