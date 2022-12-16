import { Modal, Form, Input, Button, Select, Switch } from "antd";
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

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
    lg: {
      span: 32,
      offset: 8,
    },
  },
};

const UserUpdateModal = ({
  isModalOpen,
  setIsModalOpen,
  handleUpdate,
  updatingUser,
  allUsers,
}) => {
  const [reportingToValue, setreportingToValue] = useState();
  const [verified, setVerified] = useState();
  //   console.log("I am here UserUpdateModal ");
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReportingChange = (value) => {
    console.log(`handleReportingChange selected ${value}`);
    allUsers.map((user) => (
        console.log ("Reporting Selected", user)
      ));
      
  };

  const handleRoleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleVerifyChange = (value) => {
    console.log(`Verification:  ${value}`);
  };

  return (
    <Modal
      title="Update User Details"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        {...formItemLayout}
        onFinish={handleUpdate}
        fields={[
          { name: ["name"], value: updatingUser.name },
          { name: ["phone"], value: updatingUser.phone },
          { name: ["role"], value: updatingUser.role },
          { name: ["isVerified"], value: updatingUser.isVerified },
          { name: ["reportsTo"], value: updatingUser.reportsTo },
        ]}
      >
        <Form.Item name="name" label="Name">
          <Input
            prefix={<EditOutlined className="site-form-item-icon" />}
            placeholder="Enter new name"
          />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number">
          <Input
            prefix={<EditOutlined className="site-form-item-icon" />}
            placeholder="Enter new name"
          />
        </Form.Item>
        <Form.Item name="role" label="Role">
          <Select
            defaultValue={updatingUser.role}
            // style={{
            //   width: 120,
            // }}
            onChange={handleRoleChange}
          >
            <Option value="Recruiter">Recruiter</Option>
            <Option value="Account Manager">Account Manager</Option>
            <Option value="Vendor">Vendor</Option>
            <Option value="Admin">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item name="reportsTo" label="Reports To">
          <Select
            value={updatingUser.reportsTo}
            onChange={handleReportingChange}
            // onChange={(value) => {
            //   setValue(user.name);
            // }}
            // value={user.name}
          >
            {allUsers.map((user) => (
              <Select.Option key={user.name} value={user.name}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="isVerified" label="Verify User?">
          <Select
            defaultValue = {
              updatingUser.isVerified
                ? {value: "true", label: "Yes"}
                : {value: "false", label: "No"}
            }
            value={
              updatingUser.isVerified
                ? {value: "true", label: "Yes"}
                : {value: "false", label: "No"}
            }
            // style={{
            //   width: 120,
            // }}
            onChange={handleVerifyChange}
          >
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserUpdateModal;
