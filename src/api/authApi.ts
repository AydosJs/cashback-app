import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { post } from "./ApiClients";

export type AuthPayload = {
  phoneNumber?: string;
  code?: string;
};

export type TokenResponse = {
  token: string;
  name: string;
};

const clientConfig = {
  timeout: 40000
};

export const httpAxios = axios.create(clientConfig);

export function getCode(query: AuthPayload) {
  return post("https://api.uracashback.uz/security/send-verification", query);
}

export function register(data: AuthPayload) {
  return post("https://api.uracashback.uz/security/verify-login", data);
}

httpAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = Cookies.get("token");
    config.headers = {
      ...config.headers,
    };
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    console.error("[axios interceptor][0] err - ", error);
    return Promise.reject(error);
  }
);
