import { useState, useContext } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";

const { SubMenu } = Menu;

const TopNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [current, setCurrent] = useState("mail");
  // hooks
  const router = useRouter();

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const signOut = () => {
    // remove from local storage
    localStorage.removeItem("auth");
    // remove from context
    setAuth({
      user: null,
      token: "",
    });
    // redirect to login
    router.push("/signin");
  };

  const roleBasedLink = () => {
    if (auth?.user?.role === "Admin") {
      return "/admin";
    } else if (auth?.user?.role === "Recruiter") {
      return "/recruiter";
    } else if (auth?.user?.role === "SPoC") {
      return "/spoc";
    } else if (auth?.user?.role === "Vendor") {
      return "/vendors";
    } else if (auth?.user?.role === "Guest") {
      return "/guest";
    } else {
      return "/";
    }
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="reqs" icon={<OrderedListOutlined />}>
        <Link href="/reqs">
          <a>Requirements</a>
        </Link>
      </Menu.Item> */}

      {auth?.user === null && (
        <>
          <Menu.Item
            style={{ marginLeft: "auto" }}
            key="signup"
            icon={<UserAddOutlined />}
          >
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="signin" icon={<UserOutlined />}>
            <Link href="/signin">
              <a>Sign In</a>
            </Link>
          </Menu.Item>
        </>
      )}

      {auth?.user !== null && (
        <>
          {/* <Menu.Item
            key="admin"
            style={{ marginLeft: "auto" }}
            icon={<SettingOutlined />}
            title={auth?.user?.name || auth?.user?.email}
          >
            { <Link href="/admin">
              <a>Admin Page</a>
            </Link> }
          </Menu.Item> */}
          <SubMenu
            key="SubMenu"
            icon={<UserOutlined />}
            title={auth?.user?.name || auth?.user?.email}
            style={{ marginLeft: "auto" }}
          >
            <Menu.Item key="setting:2">
              <Link href={roleBasedLink()}>
                <a>Dashboard</a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            onClick={() => signOut()}
            key="signout"
            icon={<LogoutOutlined />}
          >
            <a>Sign out</a>
          </Menu.Item>
        </>
      )}

      <Menu.Item>
        <ToggleTheme />
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
