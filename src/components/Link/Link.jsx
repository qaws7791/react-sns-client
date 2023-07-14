import { Link as LinkComponent } from "react-router-dom"
import styled from "styled-components"

const Link = ({to, children, ...props }) => {
  return (
    <StyledLink to={to} {...props}>{children}</StyledLink>
  )
}

const StyledLink = styled(LinkComponent)`
  display: inline-block;
  position: relative;
  padding: 1rem;
  color: #0b95ff;
  &:hover{
    text-decoration: underline;
  }
`

export default Link