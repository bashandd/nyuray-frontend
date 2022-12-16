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

const ReqAssignmentModal = ({
  isModalOpen,
  setIsModalOpen,
  handleUpdate,
  reqAssignment,
  allUsers
}) => {

  //   console.log("I am here ReqAssignmentModal ");
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAssignmentChange = (value) => {
    // console.log(`handleAssignmentChange selected ${value}`);

  };


  return (
    <Modal
      title="Assign Requirement"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        {...formItemLayout}
        onFinish={handleUpdate}
        fields={[
          { name: ["name"], value: reqAssignment.reqName },
          { name: ["Assign To"], value: allUsers.name },
        ]}
      >
        <Form.Item  label="Req Name">
          <Input
            prefix={<EditOutlined className="site-form-item-icon" />}
            value = {reqAssignment.reqName}
          //  placeholder="Enter new name"
          />
        </Form.Item>
       
        <Form.Item name="assignedUser" label="Assign To">
          <Select
          mode="multiple"
            value={""}
            onChange={handleAssignmentChange}
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

       
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReqAssignmentModal;
