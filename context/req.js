
//To access reqs and skills from different pages we need context
import { useState, createContext } from "react";

const ReqContext = createContext();

const ReqProvider = ({ children }) => {
  const [req, setReq] = useState({
    reqs: [],
    skills: [],
  });

  return (
    <ReqContext.Provider value={[req, setReq]}>
      {children}
    </ReqContext.Provider>
  );
};

export { ReqContext, ReqProvider };
