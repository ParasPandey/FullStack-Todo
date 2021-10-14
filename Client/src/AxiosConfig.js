import axios from "axios";

export const userAxios = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/users",
});
export const todoAxios = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/todo",
});
export const noteAxios = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/notes",
});
