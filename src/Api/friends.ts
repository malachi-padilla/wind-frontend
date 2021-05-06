import { API_URL } from "Config/globalVariables";
import { RUST_API_URL } from "Config/globalVariables";
import { sendRequest } from "./api";

export const addFriendRequest = (user1: string, user2: string) => {
  return sendRequest(`${API_URL}/friends/friendRequest`, "POST", {
    user1,
    user2,
  });
};

export const removeFriendRequest = (user1: string, user2: string) => {
  return sendRequest(`${API_URL}/friends/friendRequest`, "DELETE", {
    user1,
    user2,
  });
};

export const getFriendsRequest = (userId: string) => {
  return sendRequest(`${API_URL}/friends?user=${userId}`, "GET");
};

export const getProfilePictureByUsernameRequest = (username: string) => {
  return sendRequest(
    `${RUST_API_URL}/getProfilePicture?username=${username}`,
    "GET"
  );
};

export const getMutualFriendsRequest = (user1, user2) => {
  return sendRequest(
    `${API_URL}/friends/getMutualFriends?user1=${user1}&user2=${user2}`,
    "GET"
  );
};

export const searchUsersRequest = (searchInput: string) => {
  return sendRequest(`${API_URL}/friends/search?term=${searchInput}`, "GET");
};
