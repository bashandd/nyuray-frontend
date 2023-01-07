import MainLayout from "../../components/layout/MainLayout";
import { Row, Col, Button, Divider, Spin } from "antd";
import { Space, Table, Tag } from "antd";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ReqContext } from "../../context/req";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import ReqAssignmentModal from "../../components/modal/ReqAssignmentModal";
import { toast } from "react-hot-toast";

function Reqs() {
  const [req, setReq] = useContext(ReqContext);
  const [reqAssignment, setReqAssignment] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);


  const { reqs } = req;
  // hook
  const router = useRouter();

  let currentUserRole = "";
  let isAllowed = false;


  const columns = [
    {
      title: "Req ID",
      dataIndex: "reqID",
      key: "reqID",
      // render: (reqID) => <p>REQ-{reqID}</p>,
    },
    {
      title: "Req Name",
      dataIndex: "reqName",
      key: "reqName",
      description: "jobDescription",
      // render: (text) => <a>{text}</a>,
      render: (_, record) => (
     
           <a onClick={() => handleView(record)}>{record.reqName}</a>
         //  <a onClick={() => router.push(`/reqs/${record.slug}`)}>{record.reqName}</a>
      ),
    },
    {
      title: "Req Type",
      dataIndex: "reqType",
      key: "reqType",
    },
    {
      title: "Job Code",
      dataIndex: "jobCode",
      key: "jobCode",
    },
    {
      title: "Req Location",
      dataIndex: "reqLocation",
      key: "reqLocation",
    },
    {
      title: "Max CTC",
      dataIndex: "maxCtc",
      key: "maxCtc",
    },
    {
      title: "Skills",
      key: "skills",
      dataIndex: "skills",
      render: (_, { skills }) => (
        <>
          {skills.map((skill) => {
            let color = skill.length > 5 ? "geekblue" : "green";
            if (skill === "Java") {
              color = "volcano";
            }
            return <Tag key={skill}>{skill}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assignedUserName",
      key: "assignedUserName",
      render: (_, { assignedUserName }) => (
        <>
          {assignedUserName.map((user) => {
            let color = user.length > 7 ? "blue" : "green";

            return (
              <Tag color={color} key={user} style={{ fontSize: "16px" }}>
                {user}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  // useState(() => {
  //   getUserRole();
  // });

  useEffect(() => {
    setLoading(true);
    fetchReqs();
  }, []);

  function getUserRole() {
    if (auth) {
      let user = auth.user;

      if (user) currentUserRole = user.role;

      if (currentUserRole === "Admin") {
        isAllowed = true;
        return;
      }
    }
  }
  const fetchReqs = async () => {
    try {
      const { data } = await axios.get("/reqs");

      if (currentUserRole === "Admin") {
        setReq((prev) => ({ ...prev, reqs: data }));
      } else if (currentUserRole == "Recruiter") {
        const userEmail = auth.user.email;
        const filteredData = data.filter((req) => {
          for (let i = 0; i < req.assignedUserEmail.length; i++) {
            if (req.assignedUserEmail[i] === userEmail) return req;
          }
        });

        // console.log("Filtered Reqs", filteredData);

        setReq((prev) => ({
          ...prev,
          reqs: filteredData,
        }));

      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/users");
      setAllUsers(data);
    } catch (e) {
      toast.error(e);
    }
  };

  const handleView = async (req) => {
   
    return router.push({pathname: `/reqs/${req.slug}`,   query: { view: true }});
  };
  const handleEdit = async (req) => {
   
    return router.push({pathname: `/reqs/${req.slug}`,   query: { view: false }});
  };
  
  // const handleSingleReq = async (req) => {
  //   return router.push(`/reqs/${req.slug}`);
  // };


  const handlePost = async (req) => {
    return router.push(`/reqs/postcandidate/${req.slug}`);
  };

  const handleAssign = async (item) => {
    setIsModalOpen(true);
    setReqAssignment(item);
    setVisible(true);
  };

  const handleUpdate = async (values) => {
    const answer = window.confirm(
      "Are you sure you want to update Req Assignment"
    );
    if (!answer) return;

    setLoading(true);
    let i;
    const assignedUserName = [];
    const assignedUserEmail = [];
    const foundUser = {};

    for (i = 0; i < values.assignedUser.length; i++) {
      foundUser = allUsers.find((user) => user.name === values.assignedUser[i]);

      assignedUserName.push(foundUser.name);
      assignedUserEmail.push(foundUser.email);
    }

    try {
      const { data } = await axios.put(`/req/update/${reqAssignment._id}`, [
        assignedUserName,
        assignedUserEmail,
      ]);

      if (data?.error) {
        console.log("Error in Assigning User", data?.error);
        setLoading(false);
      }
      toast.success("User Assigned successfully");
      setVisible(false);
      setReqAssignment({});
      setLoading(false);
      fetchReqs();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("User Assignment failed");
    }
  };

  const handleDelete = async (req) => {
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/req/${req._id}`);
      if (data?.error) {
        toast.error("Requirement Delete Failed: " + data.error);
      } else {
        setReq((prev) => ({
          ...prev,
          reqs: prev.reqs.filter((p) => p._id !== req._id),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  getUserRole();
  // console.log ("is Allowed", isAllowed);

  if (currentUserRole === "Admin") {
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a>
        <a>Delete</a> */}
          <a onClick={() => handlePost(record)}>Post</a>
          <a onClick={() => handleAssign(record)}>Assign</a>
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    });
  } else {
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a>
        <a>Delete</a> */}
          <a onClick={() => handlePost(record)}>Post</a>
        </Space>
      ),
    });
  }

  return (
    <MainLayout>
      <Row justify="end" style={{ marginTop: "10px" }}>
        <Col span={4}>
          {isAllowed && (
            <Button type="primary">
              <Link href="/reqs/addreq">
                <a>
                  <PlusOutlined /> Add New Req
                </a>
              </Link>
            </Button>
          )}
        </Col>
      </Row>

      <Divider orientation="left" style={{ fontSize: "24px" }}>
        All Requirements
      </Divider>
      {loading ? (
        <Col align="center">
          <Spin size="large" />
        </Col>
      ) : (

      <Table
        columns={columns}
        rowKey="reqName"
        style={{ fontSize: "24px" }}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                marginLeft: "50px",
              }}
            >
              {record.jobDescription}
            </p>
          ),
        }}
        dataSource={reqs}
      />
      )}

      <ReqAssignmentModal
        isModalOpen={visible}
        setIsModalOpen={setVisible}
        handleUpdate={handleUpdate}
        reqAssignment={reqAssignment}
        allUsers={allUsers}
      />
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/reqs`);
  return {
    props: {
      reqs: data,
    },
  };
}

export default Reqs;
