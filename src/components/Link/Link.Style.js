import styled from "styled-components";
import { Link as LinkComponent } from "react-router-dom";

export const StyledLink = styled(LinkComponent)`
  display: inline-block;
  position: relative;
  padding: 1rem;
  color: #0b95ff;
  &:hover {
    text-decoration: underline;
  }
`;
