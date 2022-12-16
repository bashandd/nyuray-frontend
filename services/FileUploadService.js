import axios from "axios";
import FormData from "form-data";

const upload = async (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  console.log("upload file: " + file.name);
  for (const value of formData.values()) {
    console.log("Formdata value", value);
 

  try {
    // axios({
    //   method: "POST",
    //   url: "/upload",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: formData,
    //   transformRequest: [
    //     function (data, headers) {
    //       // Do whatever you want to transform the data
    //       return data;
    //     },
    //   ],

    // });
    console.log ("formData before axios", file);
    const { data } = await axios.post("/upload",file,
     {
        //  headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
     transformRequest: (file) => { return file},
     onUploadProgress,

       });
    // // console.log (" Got requirement from DB", data)
    // if (data?.error) {
    //   toast.error(data?.error);

    // } else {

    // }
  } catch (e) {}
}
};

//   return axios.post("/upload", file, {
//     headers: {
//       "Content-Type": file.type,
//     },
//     onUploadProgress,
//   });

// };

const getFiles = () => {
  return axios.get("/files");
};

export default {
  upload,
  getFiles,
};
