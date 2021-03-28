import axios from "axios";
import { API_URL } from "Config/globalVariables";

export function getUsersRequest(users: any[]) {
  return axios.post(
    `${API_URL}/user/getUsers`,
    {
      users,
    },
    {
      withCredentials: true,
    }
  );
}

export function getUserByUsernameRequest(username) {
  return axios.get(`${API_URL}/user?username=${username}`, {
    withCredentials: true,
  });
}

export function logoutRequest() {
  return axios.get(`${API_URL}/auth/logout`, {
    withCredentials: true,
  });
}

export function getMessagesRequest(user1: string, user2: string) {
  return axios.get(
    `${API_URL}/messages/getMessages?user1=${user1}&user2=${user2}`,
    { withCredentials: true }
  );
}

export function loginRequest(username, password) {
  return axios.post(
    `${API_URL}/auth/login`,
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );
}
