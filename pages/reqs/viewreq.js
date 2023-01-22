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

function ViewReq() {
  // load from local storage

  // context
  const [theme, setTheme] = useContext(ThemeContext);
  // state
  const [initialValues, setInitialValues] = useState({
    reqName: "",
    closingDate: "",
    skills: [],
    noOfPositions: 0,
    maxCtc: 0,
    reqType: "",
    reqLocation: "",
    expRange: "",
    jobCode: "",
    jobDescription: "",
    expectedCVs: 0,
    client: "",
    rgmSpoc: "",
  });

  const [formValues, setFormValues] = useState([]);

  const [loading, setLoading] = useState(false);
  const [reqId, setReqId] = useState("");

  const [skillItems, setSkillItems] = useState([""]);
  const [skillName, setSkillName] = useState("");
  const inputRef = useRef(null);
  const formRef = useRef(null);

  // hook
  const router = useRouter();
  const [form, reset] = Form.useForm();
  const { Option } = Select;

  const loadRequirement = async (data) => {
    try {
      const { data } = await axios.get(`/req/${router.query.slug}`);
      // console.log (" Got requirement from DB", data)
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        setLoading(true);
        initialValues = data;
        setReqId(data._id);
        console.log("reqID,", reqId);
        setInitialValues(initialValues);
      }
    } catch (e) {}
  };

  useLayoutEffect(() => {
    loadRequirement();
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
      console.log("Initial Values", initialValues);

      setFormValues(initialValues);

      console.log("Form values in client", formValues);
      const { data } = await axios.put(`/edit-req/${reqId}`, {
        formValues: initialValues,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success("Requirement edited successfully");

        router.push("/reqs");
      }
    } catch (err) {
      console.log(err);
      toast.error("Requirement edit failed. Try again." + err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  const getSkills = async () => {
    try {
      const { data } = await axios.get("/skills");

      if (data?.error) {
        toast.error(data.error);
      } else {
        setSkillItems(data);
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const onSkillChange = (event) => {
    setSkillName(event.target.value);
    console.log("Skill name changed: " + event.target.value);

    console.log("Skill changed: " + skillItems);
  };

  const handleSkillChange = (value) => {
    console.log("selected value ", value);

    setInitialValues({
      ...initialValues,
      skills: value,
    });
  };

  const addSkill = async (e) => {
    e.preventDefault();
    console.log("Skill Items" + skillItems);
    console.log("Skill Name" + skillName);
    setSkillItems([...skillItems, skillName || `New Skill ${index++}`]);

    try {
      const { data } = await axios.post("/skill", { name: skillName });
      console.log("data...", data.name);
      skillItems.push(data.name);
      getSkills();

      console.log("Skill Items: ", skillItems);
    } catch (e) {
      console.log("Error", e);
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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
          disabled="true"
          layout="horizontal"
          name="addRequirementForm"
          onFinish={handleSubmit}
          scrollToFirstError
        >
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{ fontWeight: "bold", fontSize: "24px" }}
          >
            Edit Requirement
          </Divider>

          <Row>
            <Col span={8} offset={1}>
              <Form.Item
                label="Req Name"
                style={{ fontSize: "18px" }}
                tooltip="Enter the requirement name"
                rules={[
                  {
                    required: true,
                    message: "Please input a name for requirement",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  value={initialValues.reqName}
                  placeholder="Req Name"
                  style={{ width: "400px" }}
                  onChange={(e) => {
                    setInitialValues({
                      ...initialValues,
                      reqName: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={8} offset={4}>
              <Form.Item
                label="Closing Date"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input a closing Date",
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  value={moment(initialValues.closingDate, "DD-MM-YYYY")}
                  style={{ fontSize: "18px" }}
                  onChange={(date, dateString) => {
                    setInitialValues({
                      ...initialValues,
                      closingDate: dateString,
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
            <Col span={8} offset={1}>
              <Form.Item
                label="Skills"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input Skills",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ fontSize: "18px" }}
                  placeholder="Select Skills"
                  defaultValue={initialValues.skills}
                  onChange={(values) => {
                    handleSkillChange(values);
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
                          placeholder="Please enter item"
                          ref={inputRef}
                          value={skillName}
                          onChange={onSkillChange}
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={addSkill}
                        >
                          Add Skill
                        </Button>
                      </Space>
                    </>
                  )}
                >
                  {skillItems.map((item) => (
                    <Option key={item.name}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="No.Of Positions"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input Number of Positions",
                  },
                ]}
              >
                <InputNumber
                  value={initialValues.noOfPositions}
                  placeholder="No. Of Positions"
                  onChange={(value) => {
                    setInitialValues({
                      ...initialValues,
                      noOfPositions: value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Max CTC"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input max CTC",
                  },
                ]}
              >
                <InputNumber
                  value={initialValues.maxCtc}
                  step="1000"
                  style={{ fontSize: "18px" }}
                  placeholder="Max CTC"
                  onChange={(value) => {
                    setInitialValues({
                      ...initialValues,
                      maxCtc: value,
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Req Type"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please Select Req Type",
                    whitespace: true,
                  },
                ]}
              >
                <Select
                  placeholder="Req Type"
                  style={{ fontSize: "18px" }}
                  value={initialValues.reqType}
                  onChange={(value, string) => {
                    setInitialValues({
                      ...initialValues,
                      reqType: value,
                    });
                  }}
                >
                  <Option value="Contractual"></Option>
                  <Option value="Direct Hire"></Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Location"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please Select Location",
                    whitespace: true,
                  },
                ]}
              >
                <Select
                  value={initialValues.reqLocation}
                  placeholder="Job Location"
                  style={{ fontSize: "18px" }}
                  onChange={(value, string) => {
                    setInitialValues({
                      ...initialValues,
                      reqLocation: value,
                    });
                  }}
                >
                  <Option value="Hyderabad"></Option>
                  <Option value="Bangalore"></Option>
                  <Option value="Chennai"></Option>
                  <Option value="Noida"></Option>
                  <Option value="Gurgaon"></Option>
                  <Option value="Delhi"></Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} offset={4}>
              <Form.Item
                label="Exp Range"
                rules={[
                  {
                    required: true,
                    message: "Please input Experience Range",
                  },
                ]}
              >
                <InputNumber
                  value={initialValues.expRange}
                  placeholder="Exp Range"
                  onChange={(value) => {
                    setInitialValues({
                      ...initialValues,
                      expRange: value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Job Code"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input Job Code",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  value={initialValues.jobCode}
                  placeholder="Job Code"
                  onChange={(e) => {
                    setInitialValues({
                      ...initialValues,
                      jobCode: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Job Description"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Job Description",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  value={initialValues.jobDescription}
                  placeholder="Job Description"
                  onChange={(e) => {
                    setInitialValues({
                      ...initialValues,
                      jobDescription: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Expected CVs"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter expected CVs",
                  },
                ]}
              >
                <InputNumber
                  value={initialValues.expectedCVs}
                  placeholder="Expected CVs"
                  onChange={(value) => {
                    setInitialValues({
                      ...initialValues,
                      expectedCVs: value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Client"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please Select Location",
                    whitespace: true,
                  },
                ]}
              >
                <Select
                  placeholder="Client"
                  style={{ fontSize: "18px" }}
                  value={initialValues.client}
                  onChange={(value, string) => {
                    setInitialValues({
                      ...initialValues,
                      client: value,
                    });
                  }}
                >
                  <Option value="TCS"></Option>
                  <Option value="Wipro"></Option>
                  <Option value="CGL"></Option>
                  <Option value="DELL"></Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="RGM SPOC"
                value={initialValues.rgmSpoc}
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter RGM SPOC",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  value={initialValues.rgmSpoc}
                  placeholder="RGM Spoc"
                  onChange={(e) => {
                    setInitialValues({
                      ...initialValues,
                      rgmSpoc: e.target.value,
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

export default ViewReq;
