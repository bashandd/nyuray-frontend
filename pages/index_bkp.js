import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Image, Row, Col } from "antd";
import { motion } from "framer-motion";

function Home() {
  //context
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   const timer =  setTimeout(() => {
  //     setLoading(false);
  //   }, 20000);
  //   router.push("/signin");
  //   return () => clearTimeout(timer);
  // }, []);

  const handleEnter = () => {
    router.push("/signin");
  };

  return (

//     <div className="example-container">
//       <motion.p
//   className="subtitle"
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ delay: 0.2 }}
// />

      
//     </div>
    
    //     <Image
    //     width={200}

    // src="./public/images/FrontPage-1.png"
    //   />
    // <div className="container">
    //   {loading ? (
    //     <div className="loader-container">
    //       <div className="spinner"></div>
    //       {/* <Image

    //         src="./public/images/lightray-1.jpg"

    //       ></Image> */}
    //     </div>
    //   ) : (
    // <div
    //   style={{
    //     background: "lightblue",
    //   }}
    //   // class="w3-container w3-center w3-animate-zoom"
    // >
    //   <Row>
    //     <Col span={12} offset={4}>
    //       <Image
    //         style={{
             
    //           marginLeft: "150px",
    //           marginRight: "auto",
    //           width: "100%",
    //         }}
    //         src="https://cdn.pixabay.com/photo/2013/07/12/15/19/prismatic-colors-149677_1280.png"
    //       ></Image>
    //       <h1
    //         style={{
    //           textAlign: "center",
    //           marginLeft: "300px",
    //           marginTop: "0px",
    //           // backgroundImage: `url ("https://cdn.pixabay.com/photo/2013/07/12/15/19/prismatic-colors-149677_1280.png")`,
    //         }}
    //       >
    //         Welcome to NyuRay
    //       </h1>
    //       <Button
    //         style={{ marginLeft: "480px", marginTop: "20px" }}
    //         type="primary"
    //         onClick={handleEnter}
    //       >
    //         Enter
    //       </Button>
    //     </Col>
    //   </Row>
    //   {/* <Image src="https://cdn.pixabay.com/photo/2013/07/12/15/19/prismatic-colors-149677_1280.png" alt="NyuRay" style="width:100%"/> */}
    // </div>


  );
}

export default Home;
