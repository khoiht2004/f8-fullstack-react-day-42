/* eslint-disable no-unsafe-optional-chaining */
import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://api01.f8team.dev/api",
});

httpRequest.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
const queueJobs = [];

async function sendRefreshToken(config, refreshToken) {
  isRefreshing = true;
  const response = await axios.post(`${config.baseURL}/auth/refresh-token`, {
    refresh_token: refreshToken,
  });
  const { access_token, refresh_token } = response?.data.data;

  localStorage.setItem("accessToken", access_token);
  localStorage.setItem("refreshToken", refresh_token);
}

httpRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (error.status === 401 && refreshToken) {
      const original = error.config;

      try {
        if (isRefreshing) {
          await new Promise((resolve, reject) => {
            queueJobs.push({ resolve, reject });
          });
        } else {
          await sendRefreshToken(original, refreshToken);
          queueJobs.forEach((job) => job.resolve());
        }

        return await httpRequest.request(original);
      } catch (error) {
        queueJobs.forEach((job) => job.reject());
        return Promise.reject(error);
      }
    }
  }
);

export default httpRequest;
