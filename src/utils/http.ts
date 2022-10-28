import qs from "qs";
// import { AuthProvider } from "screens/context/auth-context";
import * as auth from "auth-provider";
import { useAuth } from "screens/context/auth-context";
import { useCallback } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: "Get",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
    //axios
    let config1 = { ...config, test: "111" };
    axios.get(`${apiUrl}/${endpoint}`, <any>config1);
    // window.fetch(`${apiUrl}/${endpoint}`, config);
  } else {
    (config as any).body = JSON.stringify(data || {});
  }
  console.log(endpoint, config, "endpoint");
  return window.fetch(`${apiUrl}/${endpoint}`, <any>config).then(async (response) => {
    console.log(response, "response");
    // return response.data;
    if (response.status === 401) {
      auth.logout();
      window.location.reload();
      return Promise.reject({
        message: "请重新登录",
      });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token });
};
