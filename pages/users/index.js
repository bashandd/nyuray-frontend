import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import UserUpdateModal from "../../components/modal/UserUpdateModal";
// import UserVerifyModal from "../../components/modal/UserVerifyModal";
import { Layout } from "antd";
import {
  Form,
  Select,
  Input,
  Row,
  Col,
  Button,
  List,
  Modal,
  Table,
  Space,
  Tag,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";

const { Content, Sider } = Layout;

function Users() {
  // state
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const [updatingUser, setUpdatingUser] = useState({});
  const [verifyingUser, setVerifyingUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "userName",
      description: "User Name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "userEmail",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "userRole",
    },
    {
      title: "Verified?",
      dataIndex: "isVerified",
      key: "isVerified",
      width: "10%",
      //  render: (text) => String(text)
      render(text, record) {
        return {
          props: {
            style: { background: text === true ? "green" : "red" },
          },

          children: text === true ? <div>YES</div> : <div>NO</div>,
        };
      },
    },
    {
      title: "Reports To",
      dataIndex: "reportsTo",
      key: "reportsTo",
      // render: (_,  record ) => {

      // },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          {/* <a onClick={() => handleDelete(record)}>Delete</a> */}
        </Space>
      ),
    },
  ];

  //hooks
  const [form] = Form.useForm();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/users");
      setAllUsers(data);
      console.log("All users", data);
    } catch (e) {
      toast.error(e);
    }
  };

  const onFinish = async (values) => {
    console.log(" onFinish values => ", values);
    try {
      setLoading(true);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;

      const { data } = await axios.delete(`/users/${item.slug}`);

      setAllUsers(allUsers.filter((cat) => cat._id !== data._id));

      toast.success("User deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("User delete failed");
    }
  };

  const handleUpdate = async (values) => {
    console.log(" I am in handleUpdate", values);
    const answer = window.confirm("Are you sure you want to update User details?");
    if (!answer) return;

    setLoading(true);
    try {
      const { data } = await axios.put(
        `/user/update/${updatingUser._id}`,
        values
      );

      if (data?.error) {
        console.log("Error in updating User", data?.error);
        setLoading(false);
      }
      toast.success("User updated successfully");
      setVisible(false);
      setUpdatingUser({});
      setLoading(false);
      getAllUsers();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("User update failed");
    }
  };

  const handleEdit = async (item) => {
    console.log("I am in handle Edit", item);
    setIsModalOpen(true);
    setUpdatingUser(item);
    setVisible(true);
  };

  return (
    <AdminLayout>
      <Table
        columns={columns}
        rowKey="name"
        style={{ fontSize: "24px", color: "green" }}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                marginLeft: "50px",
              }}
            >
              {record.userName}
            </p>
          ),
        }}
        dataSource={allUsers}
      />

      {/* <pre>{JSON.stringify(allUsers, null, 4)}</pre> */}

      <UserUpdateModal
        isModalOpen={visible}
        setIsModalOpen={setVisible}
        handleUpdate={handleUpdate}
        updatingUser={updatingUser}
        allUsers={allUsers}
      />
    </AdminLayout>
  );
}

export default Users;
