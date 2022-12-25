import MainLayout from "../../components/layout/MainLayout";
import { Row, Col, Button, Divider } from "antd";
import { Space, Table, Tag } from "antd";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ClientContext } from "../../context/client";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

function Clients() {
  const [client, setClient] = useContext(ClientContext);
  const [loading, setLoading] = useState(false);
  const { clients } = client;

  // hook
  const router = useRouter();

  const columns = [
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      // description: "jobDescription",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Account Name",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Account Manager",
      dataIndex: "accountManager",
      key: "accountManager",
    },
    {
      title: "BDM",
      dataIndex: "BDM",
      key: "BDM",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
    {
      title: "City",
      dataIndex: "billingCity",
      key: "billingCity",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleClone(record)}>Clone</a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data } = await axios.get("/clients");
      setClient((prev) => ({ ...prev, clients: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (client) => {
  
    return router.push(`/clients/${client.slug}`);
  };
  const handleClone = async (client) => {
   
    const answer = window.confirm("Are you sure you want to Clone?");
    if (!answer) return;
      try {
        setLoading(true);
        //reset clientName and accountName as these are unique fields in DB
        client._id=null;
       client.clientName = client.clientName+"-Copy";
       client.accountName = client.accountName+"-Copy";
       
        const { data } = await axios.post("/create-client", {
          formValues: client,
          
        });
        if (data?.error) {
          toast.error(data?.error);
          setLoading(false);
          
        } else {
          toast.success("Client Cloned successfully");
          fetchClients();
          router.push("/clients");
        }
      } catch (err) {
        console.log(err);
        toast.error("Client cloning failed. Try again." + err);
        setLoading(false);
       
      }
    };


  const handleDelete = async (client) => {

    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/client/${client._id}`);
      if (data?.error) {
        toast.error("Client Delete Failed: " + data.error);
      } else {
  
        setClient((prev) => ({
          ...prev,
          clients: prev.clients.filter((p) => p._id !== client._id),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <Row justify="end" style={{ marginTop: "10px" }}>
        <Col span={4}>
          <Button type="primary">
            <Link href="/clients/addclient">
              <a>
                <PlusOutlined /> Add New Client
              </a>
            </Link>
          </Button>
        </Col>
      </Row>
      <Divider orientation="left" style={{ fontSize: "24px" }}></Divider>
      <Table
        columns={columns}
        rowKey="clientName"
        style={{ fontSize: "24px" }}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                marginLeft: "50px",
              }}
            >
              {record.billingAddress},- {record.billingCity},-
              {record.billingState},- {record.billingCountry}
            </p>
          ),
        }}
        dataSource={clients}
      />
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/clients`);
  return {
    props: {
      clients: data,
    },
    
  };
}

export default Clients;
