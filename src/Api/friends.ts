import axios from "axios";
import { API_URL } from "Config/globalVariables";
import { RUST_API_URL } from "Config/globalVariables";

export const addFriendRequest = (user1: string, user2: string) => {
  return axios.post(
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

export const removeFriendRequest = (user1: string, user2: string) => {
  return axios.delete(`${API_URL}/friends/friendRequest`, {
    withCredentials: true,
    data: {
      user1,
      user2,
    },
  });
};

export const getFriendsRequest = (userId: string) => {
  return axios.get(`${API_URL}/friends?user=${userId}`, {
    withCredentials: true,
  });
};

export const getProfilePictureByUsernameRequest = (username: string) => {
  return axios.get(`${RUST_API_URL}/getProfilePicture?username=${username}`, {
    withCredentials: true,
  });
};

export const getMutualFriendsRequest = (user1, user2) => {
  return axios.get(
    `${API_URL}/friends/getMutualFriends?user1=${user1}&user2=${user2}`,
    {
      withCredentials: true,
    }
  );
};

export const searchUsersRequest = (searchInput: string) => {
  return axios.get(`${API_URL}/friends/search?term=${searchInput}`, {
    withCredentials: true,
  });
};
