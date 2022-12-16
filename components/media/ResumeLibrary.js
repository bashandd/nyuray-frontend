import React, { useContext, useEffect, useState } from "react";
import { Upload, message, Button } from "antd";
import { AuthContext } from "../../context/auth";
import { MediaContext } from "../../context/media";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const ResumeLibrary = () => {
      // context
      const [auth, setAuth] = useContext(AuthContext);
      const [media, setMedia] = useContext(MediaContext);
    //   const [showPreview, setShowMedia] = useState(false);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {}, 3000);
    //  setLoading(false);
    // Cleanup fn
    return () => clearTimeout(delayDebounceFn);
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axios.get("/profiles");
        setMedia((prev) => ({ ...prev, resumes: data }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfiles();
  }, []);
  const props = {
    name: "file",
    // multiple: "true", // to enabled upload of multiple files
    action: `${process.env.NEXT_PUBLIC_API}/upload-resume-file`,
    headers: {
      Authorization: `Bearer ${auth.token}`,

    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        console.log("info.file => ", info.file);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        console.log("info.file after upload => ", info.file);

        //parse PDF file

        setMedia({
          resumes: [...media.resumes, info.file.response],
          selected: info.file.response,
          showMediaModal: false,
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
      },
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>

      <div style={{ textAlign: "center" }}>
        {media?.resumes?.map((resume) => (
            <pre> {JSON.stringify(resume.path, null, 4)} </pre>
         
        ))}
      </div>
    </>
  );



};

export default ResumeLibrary;
