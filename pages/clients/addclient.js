import { useContext, useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Input,
  Select,
  Button,
  Form,
  DatePicker,
  Divider,
  Space,
  InputNumber,
} from "antd";
import MainLayout from "../../components/layout/MainLayout";
import { ThemeContext } from "../../context/theme";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { PlusOutlined } from "@ant-design/icons";


const { Option } = Select;
const { Content, Sider } = Layout;
const { TextArea } = Input;

let index = 0;

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
      offset: 12,
    },
  },
};

function NewClient() {
  // load from local storage

  // context
  const [theme, setTheme] = useContext(ThemeContext);
  // state
  const [initialValues, setInitialValues] = useState({
    clientName:"",
    clientFax: "",
    clientPhone:"",
    accountName:"",
    clientEmail:"",
    expiryDate:"",
    accountManager:"",
    BDM: "",
    billingAddress:"",
    billingPO:"",
    billingCity:"",
    billingState:"",
    billingCountry:"",
    billingCode:"",
    // clientDescription:"",
    // otherEmail:"",
    // sicCode:"",
    // employees:"",
    // annualRevenue:"",
    // ownership:"",
    // industry:"",
    // parentCompany:"",

  });
  const [formValues, setFormValues] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [allUsers, setAllUsers] = useState([Object]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  // hook
  const router = useRouter();
  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(formValues));
  }, [formValues]);

  const handlePublish = async () => {
    try {
      setLoading(true);


      setFormValues(initialValues);

  
      const { data } = await axios.post("/create-client", {
        formValues: initialValues,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success("Client created successfully");
        localStorage.removeItem("formValues");
        router.push("/clients");
      }
    } catch (err) {
      console.log(err);
      toast.error("Client creation failed. Try again." + err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getClients();
   // getAllUsers();
  }, []);

  const getClients = async () => {
    try {
      const { data } = await axios.get("/clients");


      if (data?.error) {
        toast.error(data.error);
      } else {
    
        setClientList(data);
 
      }
    } catch (e) {
      toast.error(e);
    }
  };

  //get all users to fetch Assigned Recruiter and BDMs
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/allUsers");


      if (data?.error) {
        toast.error(data.error);
      } else {
   
        setAllUsers(data);

      }
    } catch (e) {
      toast.error(e);
    }
  };



  const handleCancel = () => {
    console.log("I am in handleCancel");
  };



  return (
    <MainLayout>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        name="addClientForm"
        onFinish={handlePublish}
        scrollToFirstError
      >
        <Divider
          orientation="left"
          orientationMargin="0"
          style={{ fontWeight: "bold", fontSize: "24px" }}
        >
          Posting
        </Divider>
        <Row>
          <Col span={8}>
            <Form.Item
              name="client-name"
              label="Client"
              style={{ fontSize: "18px" }}
              rules={[
                {
                  required: true,
                  message: "Please input a name for client",
                  whitespace: true,
                },
              ]}
            >
              <Input
                value={initialValues.clientName}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    clientName: e.target.value,
                  });
                }}
              />
              {/* <Select
                mode="single"
                style={{ fontSize: "18px" }}
                placeholder="Select Client"
                onChange={(values) => {
                  handleClientNameChange(values);
                }}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Space
                      style={{
                        padding: "0 8px 4px",
                      }}
                    >
                      <Input
                       // placeholder="Please enter item"
                        ref={inputRef}
                        value={initialValues.clientName}
                         onChange={onClientNameChange}
                      />
         
                    </Space>
                  </>
                )}
              >
                {clientList.map((item) => (
                  <Option key={item.clientName}>{item.clientName}</Option>
                ))}
              </Select> */}
            </Form.Item>
            <Form.Item
              name="account-name"
              label="Account Name"
              style={{ fontSize: "18px" }}
              rules={[
                {
                  required: true,
                  message: "Please input a client account",
                  whitespace: true,
                },
              ]}
            >
              <Input
                value={initialValues.accountName}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    accountName: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="clientFax"
              label="Fax"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.clientFax}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    clientFax: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="clientPhone"
              label="Phone"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.clientPhone}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    clientPhone: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              name="client-email"
              label="Email"
              style={{ fontSize: "18px" }}
              rules={[
                {
                  required: true,
                  message: "Please input a Email for client",
                  whitespace: true,
                },
              ]}
            >
              <Input
                value={initialValues.clientEmail}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    clientEmail: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="expiry-date"
              label="Expiry Date"
              style={{ fontSize: "18px" }}
              rules={[
                {
                  required: true,
                  message: "Please input a Expiry Date",
                },
              ]}
            >
              <DatePicker
                format="DD-MM-YYYY"
                value={initialValues.expiryDate}
                style={{ fontSize: "18px" }}
                onChange={(date, dateString) => {
                  setInitialValues({
                    ...initialValues,
                    expiryDate: dateString,
                  });
                }}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="accountManager"
              label="Account Manager"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.accountManager}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    accountManager: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="BDM"
              label="BDM"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.BDM}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    BDM: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider
          orientation="left"
          orientationMargin="0"
          style={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Address Information
        </Divider>

        <Row>
          <Col span={8}>
            <Form.Item
              name="billingAddress"
              label="Billing Address"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.billingAddress}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    billingAddress: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="billingPO"
              label="Billing PO Box"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.billingPO}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    billingPO: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="billingCity"
              label="Billling City"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.billingCity}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    billingCity: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              name="billingState"
              label="Billling State"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.billingState}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    billingState: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="billingCountry"
              label="Billling Country"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.billingCountry}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    billingCountry: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="billingCode"
              label="Billling Code"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.billingCode}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    billingCode: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* <Divider
          orientation="left"
          orientationMargin="0"
          style={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Description Information
        </Divider>
        <Row>
          <Col span={24}>
            <Form.Item
              name="clientDescription"
              align="left"
              label="Description"
              style={{ fontSize: "18px" }}
            >
              <TextArea
                rows={4}
                value={initialValues.clientDescription}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    clientDescription: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider
          orientation="left"
          orientationMargin="0"
          style={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Client Information
        </Divider>

        <Row>
          <Col span={8}>
            <Form.Item
              name="otherEmail"
              label="Other Email"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.otherEmail}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    otherEmail: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="sicCode"
              label="SIC Code"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.sicCode}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    sicCode: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="employees"
              label="Employees #"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.employees}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    employees: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              name="annualRevenue"
              label="Annual Revenue"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.annualRevenue}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    annualRevenue: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="ownership"
              label="Ownership"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.ownership}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    ownership: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="industry"
              label="Industry"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.industry}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    industry: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              name="parentCompany"
              label="Parent Company"
              style={{ fontSize: "18px" }}
            >
              <Input
                value={initialValues.parentCompany}
                onChange={(e) => {
                  setInitialValues({
                    ...initialValues,
                    parentCompany: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row> */}
        <Row>
        <Col span={8}>
         
         </Col>
        
          
          <Row>
          <Space>
            <Form.Item {...tailFormItemLayout}>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                shape="round"
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
         
      
            {/* <Form.Item {...tailFormItemLayout}>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                shape="round"
               // loading={loading}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Form.Item> */}
            </Space>
            </Row>
         
        
          <Col span={8}>
         
         </Col>
       
        </Row>
      </Form>
    </MainLayout>
  );
}

export default NewClient;
