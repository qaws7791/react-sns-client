import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  display: flex;
  background-color: transparent;
  border: none;
  padding: 8px;
  border-radius: 50%;
  position: relative;
  &:hover {
    background-color: #f0f0f0;
  }
  & .tooltipText {
    visibility: hidden;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 8px 10px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    white-space: nowrap;
    bottom: 100%;
    left: 0;
    transform: translateX(-18%);
  }

  &:hover .tooltipText {
    visibility: visible;
  }
`;
