import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  //context
  const [auth, setAuth] = useContext(AuthContext);
  //state
  const [loading, setLoading] = useState(false);

  //router
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (auth?.token){
      router.push("/");
    }
  }, [auth]);

  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    // send registration information to server
    setLoading(true);
    try {
      const { data } = await axios.post(`/signup`, values);
      if (data?.error) {
        toast.error("Registration Failed\n"+data.error);
        setLoading(false);
      } else {
        // save in context
        setAuth(data);
        // save in local storage
        localStorage.setItem("auth", JSON.stringify(data));

        toast.success("Successfully registered");
        setLoading(false);
        //redirect
        router.push("/");
        //
      }
      // console.log("Success resonse: ", data);
    } catch (err) {
      toast.error("Registration failed", err);
      console.log("Received registration error", err);
      setLoading(false);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px", textAlign: "center" }}>Register</h1>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: "91",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            //tooltip="What username you prefer to?"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
            <br />
            Or <a href="/signin">Login Now</a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
