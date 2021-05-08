import axios, { AxiosResponse, Method } from "axios";
import { API_URL } from "Config/globalVariables";

export async function sendRequest(
  url: string,
  requestType: Method,
  data?: any
): Promise<AxiosResponse> {
  return new Promise((resolve) => {
    const makeRequest = () =>
      axios({
        withCredentials: true,
        method: requestType,
        data: data ? data : undefined,
        url,
      });

    return makeRequest()
      .then((res) => resolve(res))
      .catch((err) => {
        if (err.response?.data === "Expired Token") {
          axios
            .post(`${API_URL}/auth/refreshToken`, {}, { withCredentials: true })
            .then(() => {
              return makeRequest().then((res) => resolve(res));
            });
        }
      });
  });
}
