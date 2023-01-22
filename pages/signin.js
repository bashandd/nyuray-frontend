import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox, Col, Row, Card } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { MainLayout } from "../components/layout/MainLayout";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";

function Signin() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(false);
  // hooks
  const router = useRouter();

  const { Meta } = Card;

  useEffect(() => {
    if (auth?.token) {
      //router.push("/");
    }
  }, [auth]);

  const onFinish = async (values) => {
    // console.log("values => ", values);
    try {
      setLoading(true);
      const { data } = await axios.post("/signin", values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // console.log("signin response => ", data);
        // save user and token to context
        setAuth(data);
        // save user and token to local storage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully signed in\n" + data?.user?.role);
        // redirect user
        if (data?.user?.role === "Admin") {
          router.push("/admin");
        } else if (data?.user?.role === "Recruiter") {
          router.push("/recruiter");
        } else if (data?.user?.role === "Vendor") {
          router.push("/vendors");
        } else if (data?.user?.role === "Guest") {
          router.push("/guest");
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      console.log("err => ", err);
      setLoading(false);
      toast.error("Signin failed. Try again.\n" + err);
    }
  };

  return (
    <div  style={{ backgroundColor: "whitesmoke" }}>
      <Row>
        <Col span={8} offset={8}>
          <h1 style={{ paddingTop: "100px", size: "20px" }}></h1>
          <Card
            style={{
              width: 500,
              margin: "20px",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <Meta
              avatar=<LoginOutlined />
              title="Sign In"
              style={{ marginLeft: "150px", fontSize: "20px" }}
            />
            <br></br>
            <Form
              // form={form}

              name="normal_login"
              initialValues={{
                remember: true,
                // email: "admin@nyuray.com",
                // password: "admin123",
              }}
              onFinish={onFinish}
            >
              {/* email */}
              <Form.Item name="email" rules={[{ type: "email" }]}>
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              {/* password */}
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Link href="/forgot-password">
                <a style={{ marginLeft: "150px" }}>Forgot Password</a>
              </Link>
              <br />
              <br />

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ marginLeft: "170px" }}
                >
                  Login
                </Button>
                <br />
                <p style={{ marginLeft: "200px" }}> Or </p>
                <Link href="/signup">
                  <a style={{ marginLeft: "160px" }}>Register now!</a>
                </Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Signin;
