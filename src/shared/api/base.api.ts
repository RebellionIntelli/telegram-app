import axios from "axios";

export const baseApi = axios.create({
  baseURL: "http://89.22.227.26:4500/api/",
});
