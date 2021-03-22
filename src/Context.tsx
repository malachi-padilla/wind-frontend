import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "components/types";

export const MyContext = createContext<UserContext | null | undefined>(null);
const Context = ({ children }) => {
  const [user, setUser] = useState<UserContext | null | undefined>(null);
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/user", { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data !== "no user") {
          setUser(res.data);
          
        } else {
          setUser(undefined);
        }
      });
  }, []);
  return (
    <MyContext.Provider value={user}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;
