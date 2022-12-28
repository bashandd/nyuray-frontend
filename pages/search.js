import axios from "axios";
import { Table } from "ant-table-extensions";
import {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useForm,
} from "react";
import { toast } from "react-hot-toast";
import MainLayout from "../components/layout/MainLayout";
import { Divider, Spin,  Col } from "antd";

function SearchProfiles() {
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
        title: "Total Exp",
        dataIndex: "totalExp",
        key: "totalExp",
      },
    {
      title: "Primary Skills",
      dataIndex: "primarySkills",
      key: "primarySkills",
    },
    {
      title: "Secondary Skills",
      dataIndex: "secondarySkills",
      key: "secondarySkills",
    },
    // {
    //   title: "Current CTC",
    //   dataIndex: "currentCTC",
    //   key: "currentCTC",
    // },
    // {
    //   title: "Expected CTC",
    //   dataIndex: "expectedCTC",
    //   key: "expectedCTC",
    // },
    // {
    //   title: "Notice Period",
    //   dataIndex: "noticePeriod",
    //   key: "noticePeriod",
    // },
    // {
    //   title: "Created By",
    //   dataIndex: "createdBy",
    //   key: "createdBy",
    // },
    {
      title: "Resume URL",
      dataIndex: "resumePath",
      key: "resumePath",
      render: (text, record) => <a href={text}> {record.resumeFileName} </a>,
    },
  ];
  const [candidateList, setcandidateList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCandidatesFromDB = async () => {

    try {
      
      const { data } = await axios.get(`/get-all-candidates`);
     
     
      setcandidateList(data);
      setLoading(false);

    } catch (e) {
      toast.error(e);
      setLoading(false);
      
    }
  };
  useEffect(() => {
    setLoading(true);
    getAllCandidatesFromDB();
  
  }, []);

  return (
    <MainLayout>
      <Divider
      
        orientationMargin="0"
        style={{

          fontSize: "24px",
        }}
      >
        <h1> Search Profiles here</h1>
      </Divider>
      {loading ? (
        <Col align="center">
          <Spin size="large" />
        </Col>
      ) : (
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
              {record.primarySkills}
            </p>
          ),
        }}
        dataSource={candidateList}
      />
      )}
    </MainLayout>
  );
}

export default SearchProfiles;
