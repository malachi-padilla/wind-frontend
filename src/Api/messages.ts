import axios from "axios";

export const getRecentlyMessagedRequest = (username: string) => {
  return axios.get(
    `http://localhost:4000/messages/recentlyMessaged?user=${username}`
  );
};
