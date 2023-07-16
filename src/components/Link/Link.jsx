import * as S from './Link.Style'
import PropTypes, { oneOfType } from 'prop-types';

const Link = ({ to, children, ...props }) => {
  return (
    <S.StyledLink to={to} {...props}>
      {children}
    </S.StyledLink>
  )
}

Link.propTypes = {
  to: PropTypes.string,
  children: oneOfType([PropTypes.string, PropTypes.element])
}


export default Link