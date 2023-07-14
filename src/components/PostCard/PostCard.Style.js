import { styled } from "styled-components";

export const ModalList = styled.ul`
  text-align: center;
  min-width: 200px;
`;

export const ModalItem = styled.li`
  padding: 1rem;
  cursor: pointer;
  border-radius: 1rem;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Container = styled.div`
  max-width: 700px;
  padding: 16px;
  box-shadow: 0 -1px 0 0 #ccc inset;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PostInfo = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;
`;

export const UserName = styled.span`
  font-weight: 600;
`;
export const PostDate = styled.span`
  color: #757575;
`;

export const PostContent = styled.div``;

export const PostText = styled.p``;
export const PostImage = styled.img`
  max-height: 500px;
  object-fit: contain;
  width: 100%;
  max-width: 500px;
  border-style: none;
`;

export const PostButtons = styled.div`
  display: flex;
  align-items: center;
`;
