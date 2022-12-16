import { Layout } from "antd";
import SpocLayout from "../../components/layout/SpocLayout";
const { Content, Sider } = Layout;

function Spoc() {
  console.log ("I am here in SPOC");
  return (
    <SpocLayout>
      <h1 style={{ paddingTop: "20px", paddingLeft: "40px" }}>
        This is SPOC page.........
      </h1>
    </SpocLayout>
  );
}

export default Spoc;
