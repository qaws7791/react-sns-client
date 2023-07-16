import PropTypes from 'prop-types';
import * as S from './InputText.Style'


const InputText = ({ 
  type,
  value, 
  onChange, 
  id, 
  name, 
  placeholder,
  minLength,
  maxLength,
  pattern,
  errorText,
  autoComplete,
  width,
  ...props}) => {
  return (
    <S.Container width={width}>
    <S.InputText
      type={type}
      name={name} 
      id={id} 
      onChange={(e)=> onChange(e.target.value)} 
      value={value} 
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
      autoComplete={autoComplete}

      {...props}
    />
    {errorText && <S.ErrorText>{errorText}</S.ErrorText>}
    </S.Container>
  )
}

InputText.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  pattern: PropTypes.string,
  errorText: PropTypes.string,
  autoComplete: PropTypes.string,
  width: PropTypes.string,
}

export default InputText