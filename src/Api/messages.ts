import axios from "axios";
import { API_URL } from "Config/globalVariables";

export const getRecentlyMessagedRequest = (username: string) => {
  return axios.get(`${API_URL}/messages/recentlyMessaged?user=${username}`);
};
