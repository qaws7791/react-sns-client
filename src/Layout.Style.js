import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.header`
  height: 80px;
  padding: 0 1rem;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -1px 0 0 #ccc inset;
`;

export const Main = styled.main`
  width: 100%;
  flex-grow: 1;
`;

export const HeaderTitle = styled.div`
  font-size: 2.2rem;
  display: inline-block;
  font-weight: 600;
  color: #000;
`;
