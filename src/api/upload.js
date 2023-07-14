import axios from "axios";
import api from "@/api/api";

export const uploadImageS3 = async (url, file) => {
  const res = await axios.put(url, file);
  return res.data;
};

export const getUploadURL = async (fileName) => {
  const res = await api.post(`/upload/url`, { fileName });
  return res.data;
};
