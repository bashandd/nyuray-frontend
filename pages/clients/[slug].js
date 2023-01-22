import {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useForm,
} from "react";
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
import moment from "moment";

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
      offset: 8,
    },
  },
};

function EditClient() {
  // load from local storage

  // context
  const [theme, setTheme] = useContext(ThemeContext);
  // state
  const [initialValues, setInitialValues] = useState({
    clientName: "",
    clientFax: "",
    clientPhone: "",
    accountName: "",
    clientEmail: "",
    expiryDate: "",
    accountManager: "",
    BDM: "",
    billingAddress: "",
    billingPO: "",
    billingCity: "",
    billingState: "",
    billingCountry: "",
    billingCode: "",
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

  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState("");

  // const [skillItems, setSkillItems] = useState([""]);
  // const [skillName, setSkillName] = useState("");
  const inputRef = useRef(null);
  const formRef = useRef(null);

  // hook
  const router = useRouter();
  const [form, reset] = Form.useForm();
  const { Option } = Select;

  const loadClient = async (data) => {
    try {
      const { data } = await axios.get(`/client/${router.query.slug}`);

      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        setLoading(true);
        initialValues = data;
        setClientId(data._id);

        setInitialValues(initialValues);
      }
    } catch (e) {}
  };

  useLayoutEffect(() => {
    loadClient();
  }, [router?.query?.slug]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {}, 3000);
    setLoading(false);
    // Cleanup fn
    return () => clearTimeout(delayDebounceFn);
  }, [initialValues]);

  const onReset = () => {
    form.resetFields();
  };
  const handleonValuesChange = async () => {};

  const handleSubmit = async () => {
    try {
      setLoading(true);

      setFormValues(initialValues);

      const { data } = await axios.put(`/edit-client/${clientId}`, {
        formValues: initialValues,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success("Client edited successfully");

        router.push("/clients");
      }
    } catch (err) {
      console.log(err);
      toast.error("Client edit failed. Try again." + err);
      setLoading(false);
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
      {loading ? (
        <div> Loading ...</div>
      ) : (
        <Form
          ref={formRef}
          {...formItemLayout}
          form={form}
          layout="horizontal"
          name="addClientForm"
          onFinish={handleSubmit}
          scrollToFirstError
        >
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            Edit Client Details
          </Divider>
          <Row>
            <Col span={8}>
              <Form.Item
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
              </Form.Item>

              <Form.Item
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
              <Form.Item label="Fax" style={{ fontSize: "18px" }}>
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
              <Form.Item label="Phone" style={{ fontSize: "18px" }}>
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
                  value={moment(initialValues.expiryDate, "DD-MM-YYYY")}
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
              <Form.Item label="Account Manager" style={{ fontSize: "18px" }}>
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
              <Form.Item label="BDM" style={{ fontSize: "18px" }}>
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
              <Form.Item label="Billing Address" style={{ fontSize: "18px" }}>
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
              <Form.Item label="Billing PO Box" style={{ fontSize: "18px" }}>
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
              <Form.Item label="Billling City" style={{ fontSize: "18px" }}>
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
              <Form.Item label="Billling State" style={{ fontSize: "18px" }}>
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
              <Form.Item label="Billling Country" style={{ fontSize: "18px" }}>
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
              <Form.Item label="Billling Code" style={{ fontSize: "18px" }}>
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
        </Form>
      )}

      <div></div>
    </MainLayout>
  );
}

export default EditClient;
