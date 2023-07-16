import styled from "styled-components";

export const PostComments = styled.div``;

export const CommentWrite = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin: 0 20px;
`;

export const CommentsList = styled.ul``;
export const CommentItem = styled.li`
  padding: 1rem;
  box-shadow: 0 -1px 0 0 #ccc inset;
`;

export const CommentHeader = styled.div`
  gap: 2rem;
  display: flex;
`;

export const CommentUser = styled.span`
  font-weight: 600;
`;

export const CommentContent = styled.p``;

export const CommentDate = styled.span`
  color: #757575;
`;
