import React, { useState, useEffect } from "react";
import { Menu, Button, Layout } from "antd";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import {
  PieChartOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  GroupOutlined,
  PushpinOutlined,
  CameraOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  BgColorsOutlined,
  UserOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SpocNav = () => {
  console.log("I am here in SpocNav");
  // state
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");

  // hooks
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  useEffect(() => {
    if (onlyWidth <= 800) {
      setCollapsed(true);
    } else if (onlyWidth > 800) {
      setCollapsed(false);
    }
  }, [onlyWidth < 800]);

  const activeName = (name) => `${current === name && "active"}`;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["2", "7", "11"]}
        defaultOpenKeys={["2"]}
        mode="inline"
        //inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<SettingOutlined />}>
          <Link href="/spoc">
            <a className={activeName("/spoc")}>Dashboard</a>
          </Link>
        </Menu.Item>

        {/* jobs */}
        <SubMenu key="2" icon={<PushpinOutlined />} title="Jobs">
          <Menu.Item key="3">
            <Link href="/jobs">
              <a className={activeName("/jobs")}>All Jobs</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/jobs/spocassignedjobs">
              <a className={activeName("/jobs/spocassignedjobs")}>
                My Assignment
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link href="/jobs/vendorassignedjobs">
              <a className={activeName("/jobs/vendorassignedjobs")}>
                Vendor Assignment
              </a>
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* profile */}
        <Menu.Item key="6" icon={<UserOutlined />}>
          <Link href="/spoc/profile">
            <a className={activeName("/spoc/profile")}>Profile</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SpocNav;
