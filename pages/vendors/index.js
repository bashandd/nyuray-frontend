import { useState, useEffect } from "react";
import { Layout } from "antd";
import MainLayout from "../../components/layout/MainLayout";
import { Form, Input, Row, Col, Button, List, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";

const { Content, Sider } = Layout;

function Vendors(navigation) {
  // state
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);

  //hooks
  const [form] = Form.useForm();

  useEffect(() => {
    getVendors();
  }, []);

  const getVendors = async () => {
    try {
      const { data } = await axios.get("/vendors");
      setVendors(data);
    } catch (e) {
      toast.error(e);
    }
  };

  const onFinish = async (values) => {
    // console.log(values.name, values.email, values.company);
    try {
      setLoading(true);
      const { data } = await axios.post("/vendor", values);
      console.log("Vendor ::", data);
      if (data?.error) {
        toast.error("Vendor Creation Failed\n" + data.error);
        setLoading(false);
      } else {
        //to append new data in the last swap data & ...vendors below
        setVendors([data, ...vendors]); // to get the screen updated with data as sooon as we add it
        toast.success("Vendor created successfully");
        setLoading(false);
        form.resetFields(["name", "email", "company"]);
      }
    } catch (err) {
      console.log("error", err);
      toast.error("Vendor creation failed");
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(`/vendor/${item.slug}`);

      if (data?.error) {
        toast.error("Vendor Deletion Failed\n" + data.error);
      } else {
        setVendors(vendors.filter((cat) => cat._id !== data._id));

        toast.success("Vendor deleted successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Vendor delete failed", err);
    }
  };

  return (
    <MainLayout>
      <Row justify="end" style={{ marginTop: "10px" }}>
        <Col span={4}>
          <Button type="primary">
            <a href="javascript:history.back()">Go Back</a>
          </Button>
        </Col>
      </Row>
<Divider></Divider>
      <Row>
        {/* first column  screen size => xs=extra small sm-small, lg=large */}

        <Col xs={22} sm={22} lg={10} offset={1}>
          <h1>Vendors</h1>
          <p>Add new Vendor</p>

          <Form onFinish={onFinish} form={form}>
            <Form.Item name="name">
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Vendor Name"
              />
            </Form.Item>
            <Form.Item name="email">
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Vendor Email"
              />
            </Form.Item>
            <Form.Item name="company">
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Vendor Company"
              />
            </Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
        {/* second column */}
        <Col xs={22} sm={22} lg={10} offset={1}>
          <List
            itemLayout="horizontal"
            dataSource={vendors}
            renderItem={(item) => (
              <List.Item
                boardred
                actions={[
                  <a>edit</a>,
                  <a
                    onClick={() => {
                      handleDelete(item);
                    }}
                  >
                    delete
                  </a>,
                ]}
              >
                <List.Item.Meta title={item.name} />
                <List.Item.Meta title={item.email} />
                <List.Item.Meta title={item.company} />
              </List.Item>
            )}
          ></List>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Vendors;
