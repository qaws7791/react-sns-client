import { styled } from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const ModalBG = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalContent = styled.div`
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
  border: 1px solid #eee;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
