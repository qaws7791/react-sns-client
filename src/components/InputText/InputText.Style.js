import { styled, css } from "styled-components";

export const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}
`;

export const InputText = styled.input`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.7em 1em;
  font-size: 1.6rem;
  outline: none;

  &:hover,
  &:focus,
  &:focus-within {
    border-color: #000;
  }

  &:invalid {
    border-color: #ff5151;
  }
  &:focus:invalid ~ span {
    display: block;
  }

  ${(props) =>
    props.pattern &&
    css`
      &:valid {
        border-color: #05ce00;
      }
    `}

  pattern
  &:valid {
    border-color: #05ce00;
  }
`;

export const ErrorText = styled.span`
  margin-top: 10px;
  display: none;
  color: #ff5151;
  line-height: 1.4;
`;
