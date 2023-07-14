import api from "@/api/api";

export const addComment = async ({ postId, comment }) => {
  const res = await api.post(`/comment/${postId}`, { comment });
  return res.data;
};

export const deleteComment = async ({ postId, commentId }) => {
  const res = await api.delete(`/comment/${postId}/${commentId}`);
  return res.data;
};
