import api from "@/api/api";

export const addLike = async (postId) => {
  const res = await api.post(`/like/${postId}/like`);
  return res.data;
};

export const deleteLike = async (postId) => {
  const res = await api.delete(`/like/${postId}/unlike`);
  return res.data;
};
