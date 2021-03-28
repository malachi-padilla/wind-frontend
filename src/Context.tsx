import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { PersonalUserInfo, UserContext } from "Components/types";

export const MyContext = createContext<UserContext>({
  user: null,
  setFetchNew: null,
});
const Context = ({ children }) => {
  const [user, setUser] = useState<PersonalUserInfo | null | undefined>(null);
  const [fetchNew, setFetchNew] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/user", { withCredentials: true })
      .then((res) => {
        if (res.data !== "no user") {
          setUser(res.data);
        } else {
          setUser(undefined);
        }
      });
  }, [fetchNew]);
  return (
    <MyContext.Provider value={{ user, setFetchNew }}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;
