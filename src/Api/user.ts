import axios from "axios";
import { API_URL } from "Config/globalVariables";

export function getUsersRequest(users: string[]) {
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

export function getUserByUsernameRequest(username: string) {
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

export function loginRequest(username: string, password: string) {
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

export function getLoggedInUserRequest() {
  return axios.get(`${API_URL}/auth/user`, {
    withCredentials: true,
  });
}

export function registerRequest(username: string, password: string) {
  return axios.post(
    `${API_URL}/auth/register`,
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );
}

export function getUserById(userId: string) {
  return axios.get(`${API_URL}/user/${userId}`, {
    withCredentials: true,
  });
}

export function updateUserInfo(key: string, e: any) {
  const {
    target: { value },
  } = e;
  const shippingData = {};
  shippingData[key] = value.trim();
  if (value.length > 0) {
    return axios.post(`${API_URL}/user/updateUserInfo`, shippingData, {
      withCredentials: true,
    });
  }
}
