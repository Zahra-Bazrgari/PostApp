import axios, { AxiosInstance } from "axios";

const serverUrl: string = "https://dummyjson.com";

export const generateClient = (): AxiosInstance => {
  return axios.create({
    baseURL: serverUrl,
  });
};
