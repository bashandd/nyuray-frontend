import React, { useContext, useEffect } from "react";
import { Upload, message, Button } from "antd";
import { AuthContext } from "../../context/auth";
import { MediaContext } from "../../context/media";
import { UploadOutlined } from "@ant-design/icons";



const UploadFile = () => {
  console.log ("In UploadFile");
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {}, 3000);
    //  setLoading(false);
    // Cleanup fn
    return () => clearTimeout(delayDebounceFn);
  });

  const props = {
    name: "file",
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
  };

  return (
    <Upload {...props} maxCount={1}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
  //   return (
  //  <> Upload File</>
  //   );
};

export default UploadFile;
