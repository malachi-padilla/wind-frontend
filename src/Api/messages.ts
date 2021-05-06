import { API_URL } from "Config/globalVariables";
import { sendRequest } from "./api";

export const getRecentlyMessagedRequest = (username: string) => {
  return sendRequest(
    `${API_URL}/messages/recentlyMessaged?user=${username}`,
    "GET"
  );
};
