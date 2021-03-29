import axios from "axios";
import { API_URL } from "Config/globalVariables";

export const addFriendRequest = async (user1: string, user2: string) => {
  return await axios.post(
    `${API_URL}/friends/friendRequest`,
    {
      user1,
      user2,
    },
    {
      withCredentials: true,
    }
  );
};

export const removeFriendRequest = async (user1: string, user2: string) => {
  return await axios.delete(`${API_URL}/friends/friendRequest`, {
    withCredentials: true,
    data: {
      user1,
      user2,
    },
  });
};

export const getFriendsRequest = (userId) => {
  return axios.get(`${API_URL}/friends?user=${userId}`, {
    withCredentials: true,
  });
};
