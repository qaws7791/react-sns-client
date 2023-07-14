import PropTypes, { oneOfType } from 'prop-types';
import * as S from './Button.Style'
const Button = ({
  name,
  type,
  onClick,
  children,
  fullWidth,
  ...props
}) => {
  return (
    <S.Button
      name={name}
      type={type}
      onClick={onClick}
      full={fullWidth ? 'true' : 'false'}
      {...props}
    >{children}</S.Button>
  )
}

Button.defaultProps = {
  fullWidth: false,
  type: 'submit',
  children: 'button',
  onClick: () => {},
}

Button.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  children: oneOfType([PropTypes.string,PropTypes.element]),
}

export default Button