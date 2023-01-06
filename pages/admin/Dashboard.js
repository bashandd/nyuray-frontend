import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Card, Col, Row, Layout, Tooltip } from "antd";
import {
  InfoCircleFilled,
  CaretUpFilled,
  UserOutlined,
  FileTextTwoTone,
  SmileFilled,
  SmileOutlined,
  TeamOutlined,
  FolderOpenTwoTone,
  FolderFilled,
  FolderTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import ChartCard from "../../components/chart/ChartCard";
// import MiniArea from "../../components/chart/MiniArea";
// import MiniBar from "../../components/chart/MiniBar";
// import MiniProgress from "../../components/chart/MiniProgress";
 import { movementSummary, visitSummary } from "./Constants";
// import ProductBarChart from "../../components/chart/ProductBarChart";
// import ProductPieChart from "../../components/chart/ProductPieChart";

function Dashboard() {
  const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
  };

  const [allUsers, setAllUsers] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [allOpenReqs, setAllOpenReqs] = useState([]);


  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/users");
      //console.log("All users", data);
      setAllUsers(data);
     // console.log("all users length", allUsers.length);
    } catch (e) {
      toast.error(e);
    }
  };

  const getAllProfiles = async () => {
    try {
      const { data } = await axios.get("/get-all-candidates");
     // console.log("All Candidates", data);
      setAllProfiles(data);
     // console.log("all candidates length", allProfiles.length);
    } catch (e) {
      toast.error(e);
    }
  };
  const getAllReqs = async () => {
    try {
      const { data } = await axios.get("/reqs");
     // console.log("All Reqs", data);
      setAllOpenReqs(data);
     // console.log("all reqs length", allOpenReqs.length);
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllProfiles();
    getAllReqs();
  }, []);
  return (
    <>
      <Row gutter={24} type="flex">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="Total Users"
            avatar=<UserOutlined
              style={{
                fontSize: "20px",
                color: "blue",
              }}
            />
            action={
              <Tooltip title="Total number of Users">
                <InfoCircleFilled />
              </Tooltip>
            }
            loading={false}
            total={allUsers.length}
            // footer={
            //   <>
            //     <span className="boldText">{12}</span> Profiles added in last {' '}
            //     <span className="boldText">7</span> month
            //   </>
            // }
            contentHeight={46}
          >
            {/* <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
              Weekly Changes
              <span className="trendText">{14}%</span>
              <CaretUpFilled style={{ color: '#52c41a' }} />
            </div> */}
          </ChartCard>
        </Col>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="Total Profiles"
            avatar=<FileTextTwoTone
              twoToneColor="#eb2f96"
              style={{
                fontSize: "20px",
              }}
            />
            action={
              <Tooltip title="Total number of profiles available in Database">
                <InfoCircleFilled />
              </Tooltip>
            }
            loading={false}
            total={allProfiles.length}
            // footer={
            //   <>
            //     <span className="boldText">{12}</span> Average daily visits per
            //     day
            //   </>
            // }
            contentHeight={46}
          >
            {/* <MiniArea color="#975FE4" data={visitSummary} /> */}
          </ChartCard>
        </Col>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="Open Reqs"
            action={
              <Tooltip title="Total Open Reqs">
                <InfoCircleFilled />
              </Tooltip>
            }
            loading={false}
            avatar=<FolderOpenTwoTone
              twoToneColor="red"
              style={{
                fontSize: "20px",
               
              }}
            />
            total={allOpenReqs.length}
            // footer={
            //   <>
            //     <span className="boldText">{123}</span> Items moved in the last month
            //   </>
            // }
            contentHeight={46}
          >
            {/* <MiniBar data={movementSummary} /> */}
          </ChartCard>
        </Col>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="Closed Reqs"
            action={
              <Tooltip title="Reqs Closed in last 1 month">
                <InfoCircleFilled />
              </Tooltip>
            }
            loading={false}
            avatar=<CheckCircleTwoTone
              twoToneColor="#52c41a"
              style={{
                fontSize: "20px",
               
              }}
            />
            total={"TBD"}
            // footer={
            //   <>
            //     <span className="boldText">{12}</span> Items in the last year
            //   </>
            // }
            contentHeight={46}
          >
            {/* <MiniProgress
              percent={10}
              strokeWidth={16}
              color="#13C2C2"
              target={100}
            /> */}
          </ChartCard>
        </Col>
      </Row>
      <Row gutter={24} type="flex">
        <Col span={12}>
          <Card title="Weekly Profiles submission">
            {/* <ProductBarChart /> */}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Reqs Summary by Client ">
            {/* <ProductPieChart /> */}
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
