import React from "react";
import UploadFile from "./UploadFile";
import ResumeLibrary from "./ResumeLibrary";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Media = () => {
  return (
    <Tabs
      items={new Array(
        { label: "Upload Resume", key: 1, children: <UploadFile /> },
        { label: "Resume Library", key: 2, children: <ResumeLibrary /> })}
    />
  );
};

export default Media;
