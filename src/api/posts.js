import api from "@/api/api";

export const getPosts = async () => {
  const res = await api.get(`/post`);
  return res.data;
};

export const getPostById = async (postId) => {
  const res = await api.get(`/post/${postId}`);
  return res.data;
};

export const createPost = async (post) => {
  const res = await api.post(`/post`, post);
  return res.data;
};

export const deletePost = async (postId) => {
  const res = await api.delete(`/post/${postId}`);
  return res.data;
};
