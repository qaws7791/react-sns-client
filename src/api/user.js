import api from "@/api/api";

export const checkExistingName = async (name) => {
  return await api.post("/user/check/name", { name });
};

export const checkExistingEmail = async (email) => {
  return await api.post("/user/check/email", { email });
};

export const joinUser = async (userData) => {
  const res = await api.post("/user/signup", userData);
  return res.data;
};

export const loginUser = async (user) => {
  const res = await api.post(`/user/login`, user);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post(`/user/logout`);
  return res.data;
};

export const autoLogin = async () => {
  const res = await api.post(`/user/autoLogin`);
  return res.data;
};

export const getAccessToken = async () => {
  const res = await api.post(`/user/refresh`);
  return res.data;
};
