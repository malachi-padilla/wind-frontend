import { API_URL, RUST_API_URL } from "Config/globalVariables";
import { sendRequest } from "./api";

export function getUsersRequest(users: string[]) {
  return sendRequest(`${API_URL}/user/getUsers`, "POST", {
    users,
  });
}

export function getUserByUsernameRequest(username: string) {
  return sendRequest(
    `${RUST_API_URL}/getUserByUsername?username=${username}`,
    "GET"
  );
}

export function logoutRequest() {
  return sendRequest(`${API_URL}/auth/logout`, "GET");
}

export function getMessagesRequest(user1: string, user2: string) {
  return sendRequest(
    `${RUST_API_URL}/messages?user1=${user1}&user2=${user2}`,
    "GET"
  );
}

export function loginRequest(username: string, password: string) {
  return sendRequest(`${API_URL}/auth/login`, "POST", {
    username,
    password,
  });
}

export function getLoggedInUserRequest() {
  return sendRequest(`${RUST_API_URL}/getPersonalUser`, "GET");
}

export function registerRequest(
  username: string,
  password: string,
  email: string
) {
  return sendRequest(`${API_URL}/auth/register`, "POST", {
    username,
    password,
    email,
  });
}

export function getUserById(userId: string) {
  return sendRequest(`${API_URL}/user/${userId}`, "GET");
}

export function updateUserInfo(key: string, e: any) {
  const {
    target: { value },
  } = e;
  const shippingData = {};
  shippingData[key] = value.trim();
  if (value.length > 0) {
    return sendRequest(`${API_URL}/user/updateUserInfo`, "POST", shippingData);
  }
}
