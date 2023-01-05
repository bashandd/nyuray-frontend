import React, { useState, useEffect, useContext } from "react";
import { Menu, Button, Layout } from "antd";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import { AuthContext } from "../../context/auth";
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
  SearchOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const MainNav = () => {
  // state
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [auth, setAuth] = useContext(AuthContext);
  const isAdmin = false;
  const isRecruiter = false;
  const isGuest = false;

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

  function getUserRole() {
    if (auth) {
      let user = auth.user;
      if (user) currentUserRole = user.role;

      if (currentUserRole === "Admin") {
        isAdmin = true;
        return;
      }
    }
  }

  const activeName = (name) => `${current === name && "active"}`;

  getUserRole();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["2", "7", "11"]}
        defaultOpenKeys={["1"]}
        mode="inline"
        //inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<SettingOutlined />}>
          <Link href="/admin">
            <a className={activeName("/admin")}>Dashboard</a>
          </Link>
        </Menu.Item>

        {isAdmin ? (
          <SubMenu key="2" icon={<PushpinOutlined />} title="Requirements">
            <Menu.Item key="3">
              <Link href="/reqs">
                <a className={activeName("/reqs")}>All Reqs</a>
              </Link>
            </Menu.Item>
          </SubMenu>
        ) : (
          <SubMenu key="2" icon={<PushpinOutlined />} title="Requirements">
            <Menu.Item key="3">
              <Link href="/reqs">
                <a className={activeName("/reqs")}>My Reqs</a>
              </Link>
            </Menu.Item>
          </SubMenu>
        )}
        <Menu.Item key="4" icon={<SearchOutlined />}>
          <Link href="/search">
            <a className={activeName("/search")}>Search Profiles</a>
          </Link>
        </Menu.Item>

        {isAdmin && (
          <SubMenu key="5" icon={<PushpinOutlined />} title="Clients">
            <Menu.Item key="6">
              <Link href="/clients">
                <a className={activeName("/clients")}>All Clients</a>
              </Link>
            </Menu.Item>
          </SubMenu>
        )}

        {/* <Menu.Item key="4"  icon={<AppstoreAddOutlined />} title="Skills" >
          <Link href="/skills">
            <a className={activeName("/skills")}>Manage Skills</a>
          </Link>
        </Menu.Item> */}

        {/* vendors */}
        {isAdmin && (
          <SubMenu key="7" icon={<GroupOutlined />} title="Vendors">
            <Menu.Item key="8">
              <Link href="/vendors">
                <a className={activeName("/vendors")}>All Vendors</a>
              </Link>
            </Menu.Item>
          </SubMenu>
        )}

        {/* users */}
        {isAdmin && (
          <SubMenu key="9" icon={<UsergroupAddOutlined />} title="Users">
            <Menu.Item key="10">
              <Link href="/users">
                <a className={activeName("/users")}>All Users</a>
              </Link>
            </Menu.Item>
          </SubMenu>
        )}

        {/* profile */}
        <Menu.Item key="11" icon={<UserOutlined />}>
          <Link href="/profile">
            <a className={activeName("/profile")}>Profile</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MainNav;
