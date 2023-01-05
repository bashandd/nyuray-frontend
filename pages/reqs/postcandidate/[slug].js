import axios from "axios";
import {
  Row,
  Col,
  Card,
  Avatar,
  List,
  Divider,
  Modal,
  Button,
  Input,
  Form,
  InputNumber,
  Image,
  Space,
  Select,
  DatePicker,
  Spin,
  Tag,
  Collapse,
} from "antd";
import { Table } from "ant-table-extensions";
import { useRouter } from "next/router";
import { useRef } from "react";

import { CSVLink, CSVDownload } from "react-csv";
import * as ReactDOMServer from "react-dom/server";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/auth";
import moment from "moment";
import {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useForm,
} from "react";
import {
  FilePdfOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Media from "../../../components/media";
import { MediaContext } from "../../../context/media";
import MainLayout from "../../../components/layout/MainLayout";
import configData from "../../../config/config.json";

const { Meta } = Card;
const { Option } = Select;
const { Panel } = Collapse;

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
      offset: 10,
    },
  },
};

// Column headings

export const PostCandidate = () => {
  //hooks
  // context
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();
  const [form, reset] = Form.useForm();
  const [formValues, setFormValues] = useState([]);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const [requirement, setRequirement] = useState({
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
  const [candidate, setCandidate] = useState({
    jobCode: "",
    resumePath: "",
    resumeFileName: "",
    candidateName: "",
    contactNumber: 0,
    candidateEmail: "",
    candidateLocation: "",
    candidatePAN: "",
    highestQualification: "",
    passingYear: "",
    primarySkills: [],
    secondarySkills: [],
    workLocation: "",
    totalExp: 0,
    relevantExp: 0,
    currentCTC: 0,
    expectedCTC: 0,
    noticePeriod: "",
    currentCompany: "",
    durationFrom: "",
    durationTo: "",
  });

  // media Modal
  // const [visibleMedia, setVisibleMedia] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useContext(MediaContext);
  const [candidateList, setcandidateList] = useState([]);
  const [skillItems, setSkillItems] = useState([""]);

  const columns = [
    {
      title: "Candidate Name",
      dataIndex: "candidateName",
      key: "candidateName",
      // description: "candidateName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Candidate Email",
      dataIndex: "candidateEmail",
      key: "candidateEmail",
    },
    {
      title: "Candidate Location",
      dataIndex: "candidateLocation",
      key: "candidateLocation",
    },
    {
      title: "Current CTC",
      dataIndex: "currentCTC",
      key: "currentCTC",
    },
    {
      title: "Expected CTC",
      dataIndex: "expectedCTC",
      key: "expectedCTC",
    },
    {
      title: "Notice Period",
      dataIndex: "noticePeriod",
      key: "noticePeriod",
    },
    {
      title: "Primary Skills",
      dataIndex: "primarySkills",
      key: "primarySkills",
      render: (_, { primarySkills }) => (
        <>
          {primarySkills.map((skill) => {
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
      title: "Secondary Skills",
      dataIndex: "secondarySkills",
      key: "secondarySkills",
      render: (_, { secondarySkills }) => (
        <>
          {secondarySkills.map((skill) => {
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
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Resume URL",
      dataIndex: "resumePath",
      key: "resumePath",
      render: (text, record) => <a href={text}> {record.resumeFileName} </a>,
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a onClick={() => handleEdit(record)}>Edit</a>
    //       <a onClick={() => handleDelete(record, candidate.jobCode)}>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  const [selectedMatchingProfileRowKeys, setSelectedMatchingProfileRowKeys] = useState([]);
  const handleSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedMatchingProfileRowKeys(newSelectedRowKeys);
  };
  const matchingProfileRowSelection = {
    selectedMatchingProfileRowKeys,
    onChange: handleSelectChange,
  };

  const handleEdit = async (req) => {
    console.log("Editing Candidate", req);
  };

  const handleDelete = async (req, jobCode) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete the candidate from this Req?"
      );
      if (!answer) return;

      const { data } = await axios.put(`/candidate/update/${req._id}`, [
        jobCode,
      ]);
      if (data?.error) {
        toast.error("Candidate Delete Failed: " + data.error);
      } else {
        getAllCandidatesForAJob(candidate.jobCode);
        // setcandidateList((prev) => ({
        //   ...prev,
        //   candidateList: (prev.candidateList).filter((p) => p._id !== req._id),
        // }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // get Requirement
  const loadRequirement = async (data) => {
    try {
      const { data } = await axios.get(`/req/${router.query.slug}`);

      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        requirement = data;
        //  console.log("Requirement", requirement);
        setRequirement(requirement);
        candidate.jobCode = requirement.jobCode;

        getAllCandidatesForAJob(candidate.jobCode);

        setLoading(true);
      }
    } catch (e) {}
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {}, 3000);
    setLoading(false);

    // Cleanup fn
    return () => clearTimeout(delayDebounceFn);
  }, [requirement, candidateList]);

  useEffect(() => {
    loadRequirement();
  }, [router?.query?.slug]);

  useEffect(() => {
    getSkills();
  }, []);

  //allow only last 40 years and one next year to allow freshers coming out of college.
  function disabledDate(current) {
    return (
      current > moment().add(1, "year") ||
      current < moment().subtract(40, "year")
    );
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      setFormValues(candidate);

      const { data } = await axios.post("/create-candidate-profile", {
        formValues: candidate,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success("Profile Created successfully");
        localStorage.removeItem("formValues");
        setLoading(false);
        getAllCandidatesForAJob(candidate.jobCode);
      }
    } catch (err) {
      toast.error("Profile Creation failed. Try again." + err);
      setLoading(false);
    }
  };

  const getAllCandidatesForAJob = async (jobCode) => {
    try {
      const { data } = await axios.get(`/get-candidates-for-job/${jobCode}`);

      setcandidateList(data);
    } catch (e) {
      toast.error(e);
    }
  };

  const Mailto = ({ email, subject = "", body = "", children }) => {
    let params = subject || body ? "?" : "";
    if (subject) params += `subject=${encodeURIComponent(subject)}`;

    if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

    return <Button href={`mailto:${email}${params}`}>{children}</Button>;
  };

  // console.log ("auth", auth);
  let user = auth.user;
  if (user != null) {
    if (user.role === "Admin") {
      columns.push({
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            {/* <a onClick={() => handleEdit(record)}>Edit</a> */}
            <a onClick={() => handleDelete(record, candidate.jobCode)}>
              Delete
            </a>
          </Space>
        ),
      });
    }
  }
  // Get Skills to add to a candidate
  const getSkills = async () => {
    try {
      const { data } = await axios.get("/skills");
      if (data?.error) {
        toast.error(data.error);
      } else {
        setSkillItems(data);
        //console.log("Skill Items", skillItems);
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const handlePrimarySkillChange = (value) => {
    setCandidate({
      ...candidate,
      primarySkills: value,
    });
  };

  const handleSecondarySkillChange = (value) => {
    setCandidate({
      ...candidate,
      secondarySkills: value,
    });
  };


  const handlePanelChange = (key) => {
    console.log(key);
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
        <Col align="center">
          <Spin size="large" />
        </Col>
      ) : (
        <Form
          ref={formRef}
          {...formItemLayout}
          form={form}
          layout="vertical"
          name="addCandidateForm"
          onFinish={handleSubmit}
          scrollToFirstError
        >
          {/*  <pre>{JSON.stringify(media, null, 4)}</pre> */}
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{
              // background: "#6c9cf5",
              // fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            Requirement Details
          </Divider>
          <Row>
            <Col span={8}>
              <Form.Item
                label="Req Name"
                style={{ fontSize: "18px" }}
                disabled="true"
              >
                <Input value={requirement.reqName} placeholder="Req Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Skills" style={{ fontSize: "18px" }}>
                <Select
                  mode="multiple"
                  style={{ fontSize: "18px" }}
                  placeholder="Select Skills"
                  value={requirement.skills}
                >
                  {requirement.skills.map((item) => (
                    <Option key={item.name}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Job Code" style={{ fontSize: "18px" }}>
                <Input
                  value={requirement.jobCode}
                  placeholder="Job Code"
                  onChange={(e) => {
                    setCandidate({
                      ...candidate,
                      jobCode: e.target.value,
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
              fontSize: "24px",
            }}
          >
            Resume Details
          </Divider>
          <Row>
            <Space>
              <Form.Item>
                <Button
                  onClick={() => {
                    setMedia({ ...media, showMediaModal: true });
                  }}
                >
                  <UploadOutlined /> Upload Resume
                </Button>
              </Form.Item>

              <Form.Item>
                {media?.selected && (
                  <Button
                    type="link"
                    block
                    icon={<FilePdfOutlined />}
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    {/* {media?.selected && (candidate.resumePath=media.resumes.at(-1).url)}  */}
                    {media?.selected && media.resumes.at(-1).fileName}
                  </Button>
                )}
              </Form.Item>
            </Space>
          </Row>
          {/* preview modal */}
          <Modal
            title="Uploaded Resume"
            centered
            visible={visible}
            closable
            info={"test"}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={720}
            footer={null}
          >
            {media?.selected &&
              (candidate.resumePath = media.resumes.at(-1).url) &&
              (candidate.resumeFileName = media.resumes.at(-1).fileName)}
          </Modal>
          {/* media modal */}
          <Modal
            visible={media.showMediaModal}
            title="Media"
            onOk={() => {
              setMedia({ ...media, showMediaModal: false });
            }}
            onCancel={() => setMedia({ ...media, showMediaModal: false })}
            width={720}
            footer={null}
          >
            <Media />
          </Modal>

          {/* Matching Profiles section */}

          <Collapse
            // defaultActiveKey={["1"]}
            onChange={handlePanelChange}
            expandIcon={({ isActive }) => <PlusOutlined rotate={isActive ? 90 : 0} />}
          >
            <Panel header="Matching Profiles" style={{size: "16px"}} key="1">
            <Table
            columns={columns}
            id="matchingCandidateListTable"
            rowSelection={matchingProfileRowSelection}
            rowKey={(record) => record.candidateEmail}
            // style={{ fontSize: "24px" }}
            dataSource={candidateList}
          />
            </Panel>
          </Collapse>

          {/* Candidate Details section */}
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{
              fontSize: "24px",
            }}
          >
            Candidate Details
          </Divider>
          <Row>
            <Col span={8}>
              <Form.Item
                name="candidateName"
                label="Full Name"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input candidate name",
                  },
                ]}
              >
                <Input
                  placeholder="Name"
                  onChange={(e) => {
                    setCandidate({
                      ...candidate,
                      candidateName: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="candidateContact"
                label="Contact No."
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input Contact Number",
                  },
                  {
                    type: "string",
                    min: 10,
                    max: 10,
                    pattern: "^([-]?[1-9][0-9]*|0)$",

                    message: "Please input 10 digit contact number",
                  },
                ]}
              >
                <Input
                  placeholder="Contact"
                  onChange={(e) => {
                    setCandidate({
                      ...candidate,
                      contactNumber: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="candidateEmail"
                label="Email"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input Email",
                  },
                  {
                    type: "email",
                    // warningOnly: true,
                    message: "Please input valid email address",
                  },
                ]}
              >
                <Input
                  placeholder="Email"
                  onChange={(e) => {
                    setCandidate({
                      ...candidate,
                      candidateEmail: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                name="location"
                label="Location"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input Location",
                  },
                ]}
              >
                <Select
                  style={{
                    // width: 280,
                    fontSize: "18px",
                  }}
                  value={candidate.candidateLocation}
                  onChange={(value, string) => {
                    setCandidate({
                      ...candidate,
                      candidateLocation: value,
                    });
                  }}
                  options={configData.Location}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="panNumber"
                label="PAN Number"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input PAN number",
                  },
                  {
                    type: "string",
                    pattern: new RegExp(/^[A-Z0-9]*$/),
                    min: 10,
                    max: 10,
                    // warningOnly: true,
                    message: "Please input valid PAN number",
                  },
                ]}
              >
                <Input
                  placeholder="PAN Number"
                  value={candidate.candidatePAN}
                  onChange={(e) => {
                    setCandidate({
                      ...candidate,
                      candidatePAN: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="highestQualification"
                label="Qualification"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input Qualification",
                  },
                ]}
              >
                <Select
                  style={{
                    // width: 280,
                    fontSize: "18px",
                  }}
                  value={candidate.highestQualification}
                  onChange={(value, string) => {
                    setCandidate({
                      ...candidate,
                      highestQualification: value,
                    });
                  }}
                  options={configData.Qualification}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                name="passingYear"
                label="Passing Year"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input year",
                  },
                ]}
              >
                <DatePicker
                  format="YYYY"
                  picker="year"
                  disabledDate={disabledDate}
                  style={{
                    // width: 280,
                    fontSize: "18px",
                  }}
                  value={candidate.passingYear}
                  onChange={(date, dateString) => {
                    setCandidate({
                      ...candidate,
                      passingYear: dateString,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="primarySkills"
                label="Primary Skills"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input Primary Skills",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ fontSize: "18px" }}
                  placeholder="Select Skills"
                  onChange={(values) => {
                    handlePrimarySkillChange(values);
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
                      ></Space>
                    </>
                  )}
                >
                  {skillItems.map((item) => (
                    <Option key={item.name}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="secondarySkills"
                label="Secondary Skills"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input Secondary Skills",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ fontSize: "18px" }}
                  placeholder="Select Skills"
                  onChange={(values) => {
                    handleSecondarySkillChange(values);
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
                      ></Space>
                    </>
                  )}
                >
                  {skillItems.map((item) => (
                    <Option key={item.name}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{
              //  background: "#6c9cf5",
              // fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            Experience Details
          </Divider>
          <Row>
            <Col span={8}>
              <Form.Item
                name="workLocation"
                label="Work Location"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input Work Location",
                  },
                ]}
              >
                <Select
                  value={candidate.workLocation}
                  style={{
                    // width: 280,
                    fontSize: "18px",
                  }}
                  onChange={(value, string) => {
                    setCandidate({
                      ...candidate,
                      workLocation: value,
                    });
                  }}
                  options={configData.Location}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="totalExp"
                label="Total Experience"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input Total Experience",
                  },
                ]}
              >
                <InputNumber
                  value={candidate.totalExp}
                  style={{
                    // width: 280,
                    fontSize: "18px",
                  }}
                  placeholder="Total Experience"
                  onChange={(value) => {
                    setCandidate({
                      ...candidate,
                      totalExp: value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="relevantExp"
                label="Relevant Exp"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input relevant experience",
                  },
                ]}
              >
                <InputNumber
                  style={{
                    // width: 280,
                    fontSize: "18px",
                  }}
                  value={candidate.relevantExp}
                  placeholder="Relevant Experience"
                  onChange={(value, string) => {
                    setCandidate({
                      ...candidate,
                      relevantExp: value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                name="currentCTC"
                label="Current CTC"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input current CTC",
                  },
                ]}
              >
                <InputNumber
                  style={{
                    // width: 280,
                    fontSize: "18px",
                  }}
                  value={candidate.currentCTC}
                  step="1000"
                  placeholder="Current CTC"
                  onChange={(value, string) => {
                    setCandidate({
                      ...candidate,
                      currentCTC: value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="expectedCTC"
                label="Expected CTC"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input expected CTC",
                  },
                ]}
              >
                <InputNumber
                  style={{
                    // width: 280,
                    fontSize: "18px",
                  }}
                  value={candidate.expectedCTC}
                  step="1000"
                  placeholder="Expected CTC"
                  onChange={(value, string) => {
                    setCandidate({
                      ...candidate,
                      expectedCTC: value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="noticePeriod"
                label="Notice Period"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input notice period",
                  },
                ]}
              >
                <Select
                  // defaultValue="1 Month"
                  value={candidate.noticePeriod}
                  style={{
                    // width: 280,
                    fontSize: "18px",
                  }}
                  onChange={(value, string) => {
                    setCandidate({
                      ...candidate,
                      noticePeriod: value,
                    });
                  }}
                  options={configData.NoticePeriod}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                name="currentCompany"
                label="Current Company"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input current company",
                  },
                ]}
              >
                <Input
                  placeholder="Current company"
                  value={candidate.currentCompany}
                  onChange={(e) => {
                    setCandidate({
                      ...candidate,
                      currentCompany: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="durationFrom"
                label="Duration From"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input duration",
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  style={{
                    // width: 280,
                    fontSize: "18px",
                  }}
                  value={candidate.durationFrom}
                  onChange={(date, dateString) => {
                    setCandidate({
                      ...candidate,
                      durationFrom: dateString,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="durationTo"
                label="Duration To"
                style={{ fontSize: "18px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input duration",
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  style={{
                    // width: 280,
                    fontSize: "18px",
                  }}
                  value={candidate.durationTo}
                  onChange={(date, dateString) => {
                    setCandidate({
                      ...candidate,
                      durationTo: dateString,
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
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{
              fontSize: "24px",
            }}
          >
            Submitted Profiles
          </Divider>
          {/* <div onClick={(e) => {window.location.href ='mailto:bashandd@gmail.com';}}>Email </div> */}

          <Table
            columns={columns}
            id="candidateListTable"
            rowKey="reqName"
            style={{ fontSize: "24px" }}
            exportable
            exportableProps={{ showColumnPicker: true }}
            searchable
            expandable={{
              expandedRowRender: (record) => (
                <p
                  style={{
                    marginLeft: "50px",
                  }}
                >
                  {record.workLocation}
                </p>
              ),
            }}
            dataSource={candidateList}
          />

          <Mailto
            email="bashandd@gmail.com"
            subject={requirement.reqName + "-" + requirement.jobCode}
            // body={document.getElementById('candidateListTable').outerHTML.toString()}
            body={"Add Email body here"}
          >
            Send Email
          </Mailto>
        </Form>
      )}
    </MainLayout>
  );
};

export default PostCandidate;
