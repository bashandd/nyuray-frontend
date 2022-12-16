
//To access reqs and skills from different pages we need context
import { useState, createContext } from "react";

const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const [client, setClient] = useState({
    clients: [],
  });

  return (
    <ClientContext.Provider value={[client, setClient]}>
      {children}
    </ClientContext.Provider>
  );
};

export { ClientContext, ClientProvider };
