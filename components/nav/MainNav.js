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

const MainNav = () => {
  // state
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
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

  function getUserRole () {
    const auth = JSON.parse(localStorage.getItem('auth'));
   
    if (auth){
       currentUserRole = auth.user.role.trim();
       console.log ("auth role", auth.user.role.trim());
    }
   

    if (currentUserRole === "Admin"){
     // console.log ("Strings match", currentUserRole);
      isAdmin = true;
      return;
    }
    else {
      console.log ("String didn't match");
    }
    
  };


  const activeName = (name) => `${current === name && "active"}`;

  //  const getUserRole = async (role) => {
  //   console.log ("I am in getUserRole");
  //   try {
  //      const userRole = await localStorage.getItem("role");
  //      setCurrentUserRole(userRole);
    
  //     console.log ("Current User Role", currentUserRole);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  getUserRole();

  console.log ("Is Admin? ", isAdmin);


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
          <Link href="/dashboard">
            <a className={activeName("/dashboard")}>Dashboard</a>
          </Link>
        </Menu.Item>

        {isAdmin?( <SubMenu key="2" icon={<PushpinOutlined />} title="Requirements">
          <Menu.Item key="3">
            <Link href="/reqs">
              <a className={activeName("/reqs")}>All Reqs</a>
            </Link>
          </Menu.Item>
        </SubMenu>):<SubMenu key="2" icon={<PushpinOutlined />} title="Requirements">
          <Menu.Item key="3">
            <Link href="/reqs">
              <a className={activeName("/reqs")}>My Reqs</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        }
     
    
         {isAdmin && <SubMenu key="4" icon={<PushpinOutlined />} title="Clients">
            <Menu.Item key="5">
              <Link href="/clients">
                <a className={activeName("/clients")}>All Clients</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          
        }
     
        
        {/* <Menu.Item key="4"  icon={<AppstoreAddOutlined />} title="Skills" >
          <Link href="/skills">
            <a className={activeName("/skills")}>Manage Skills</a>
          </Link>
        </Menu.Item> */}

        {/* vendors */}
        {isAdmin &&  <SubMenu key="6" icon={<GroupOutlined />} title="Vendors">
          <Menu.Item key="7">
            <Link href="/vendors">
              <a className={activeName("/vendors")}>All Vendors</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        }

        {/* users */}
        {isAdmin && 
        <SubMenu key="8" icon={<UsergroupAddOutlined />} title="Users">
          <Menu.Item key="9">
            <Link href="/users">
              <a className={activeName("/users")}>All Users</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        }

        {/* profile */}
        <Menu.Item key="10" icon={<UserOutlined />}>
          <Link href="/profile">
            <a className={activeName("/profile")}>Profile</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MainNav;
