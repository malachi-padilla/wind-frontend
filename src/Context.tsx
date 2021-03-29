import React, { createContext, useEffect, useState } from "react";
import { PersonalUserInfo, UserContext } from "Components/types";
import { getLoggedInUserRequest } from "Api/user";

export const MyContext = createContext<UserContext>({
  user: null,
  setFetchNew: null,
});
const Context = ({ children }) => {
  const [user, setUser] = useState<PersonalUserInfo | null | undefined>(null);
  const [fetchNew, setFetchNew] = useState<boolean>(false);

  useEffect(() => {
    getLoggedInUserRequest().then((res) => {
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
