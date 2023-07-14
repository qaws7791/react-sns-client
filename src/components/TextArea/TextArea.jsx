import { styled } from 'styled-components'

export default function TextArea({ width, value, onChange, id, name, placeholder, ...props }) {
  return (
    <StyledTextArea
      name={name}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      {...props}
      maxLength={500}
      width={width}
    />
  )
}

const StyledTextArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.7em 1em;
  font-size: 1.6rem;
  outline: none;
  resize: none;
  width: 100%;
  height: 200px;
  ${(props) =>
    props.width &&
    css`
      width: ${props.width}px;
    `}
  &:hover,
  &:focus,
  &:focus-within {
    border-color: #000;
  }
`
