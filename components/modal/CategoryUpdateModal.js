import { Modal, Form, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";


const CategoryUpdateModal = ({
    openModal,
    setOpenModal,
  handleUpdate,
  updatingCategory,
}) => {
 //   console.log("I am here CategoryUpdateModal ");
  return (
    <Modal
      title="Update category"
      open={openModal}
      footer={null}
      onCancel={() => setOpenModal(false)}
    >
      <Form
        onFinish={handleUpdate}
        fields={[{ name: ["name"], value: updatingCategory.name }]}
      >
        <Form.Item name="name">
          <Input
            prefix={<EditOutlined className="site-form-item-icon" />}
            placeholder="Enter Category"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default CategoryUpdateModal;
