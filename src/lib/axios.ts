import { API_URL } from "@/constants/api";
import { LOCAL_STORAGE_KEY } from "@/constants/client-storage-keys";
import axios from "axios";

export const getToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN) || "";
};

export const AUTH_TOKEN = `Bearer ${getToken()}`;

export const API = axios.create({
  baseURL: API_URL,
});

API.defaults.headers.common["Authorization"] = AUTH_TOKEN;
