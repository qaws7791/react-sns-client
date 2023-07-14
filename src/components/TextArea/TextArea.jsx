import PropTypes from 'prop-types';
import * as S from './TextArea.Style'
const TextArea = ({ width, value, onChange, id, name, placeholder, ...props }) => {
  return (
    <S.TextArea
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

export default TextArea

TextArea.propTypes = {
  width: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
}
