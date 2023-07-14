import styled, { css } from "styled-components";

export const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0.5em 1em;
  border-radius: 0.8rem;
  cursor: pointer;
  white-space: nowrap;

  ${(props) =>
    props.full === "true" &&
    css`
      width: 100%;
    `}
  &:hover {
    background-color: #f0f0f0;
  }
`;
