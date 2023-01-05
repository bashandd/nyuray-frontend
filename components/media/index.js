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
        // commenting  resume library for now. It is working but need to discuss whether to show only matching resumes or all resumes
        // { label: "Resume Library", key: 2, children: <ResumeLibrary /> }
        )}
    />
  );
};

export default Media;
