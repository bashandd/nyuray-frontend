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
  AppstoreAddOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const RecruiterNav = () => {
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
        defaultOpenKeys={["3"]}
        mode="inline"
        //inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<SettingOutlined />}>
          <Link href="/recruiter">
            <a className={activeName("/recruiter")}>Dashboard</a>
          </Link>
        </Menu.Item>

        <SubMenu key="2" icon={<PushpinOutlined />} title="Requirements">
          <Menu.Item key="3">
            <Link href="/reqs">
              <a className={activeName("/reqs")}>All Reqs</a>
            </Link>
          </Menu.Item>
    
        </SubMenu>
        {/* <SubMenu key="4" icon={<PushpinOutlined />} title="Clients">
          <Menu.Item key="5">
            <Link href="/clients">
              <a className={activeName("/clients")}>All Clients</a>
            </Link>
          </Menu.Item>
    
        </SubMenu> */}
        {/* <Menu.Item key="4"  icon={<AppstoreAddOutlined />} title="Skills" >
          <Link href="/skills">
            <a className={activeName("/skills")}>Manage Skills</a>
          </Link>
        </Menu.Item> */}

        {/* vendors */}
        {/* <SubMenu key="6" icon={<GroupOutlined />} title="Vendors">
          <Menu.Item key="7">
            <Link href="/vendors">
              <a className={activeName("/vendors")}>All Vendors</a>
            </Link>
          </Menu.Item>

        </SubMenu> */}

        {/* users */}
        {/* <SubMenu key="8" icon={<UsergroupAddOutlined />} title="Users">
          <Menu.Item key="9">
            <Link href="/users">
              <a className={activeName("/users")}>All Users</a>
            </Link>
          </Menu.Item>
        </SubMenu> */}

        {/* profile */}
        <Menu.Item key="10" icon={<UserOutlined />}>
          <Link href="/recruiter/profile">
            <a className={activeName("/recruiter/profile")}>Profile</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default RecruiterNav;
