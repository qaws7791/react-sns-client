import { IconContext } from '@phosphor-icons/react';
import PropTypes from 'prop-types';
import * as S from './IconOnlyButton.Style'

const IconOnlyButton = ({ 
  icon,
  color, 
  size, 
  weight, 
  label,
  onClick,
  ...props
  }) => {
  return (
    <IconContext.Provider
      value={{
        color,
        size,
        weight,
      }}
    >
      <S.Button aria-label={label} onClick={onClick} {...props}>
        {icon}
        <span className="tooltipText">{label}</span>
      </S.Button>
    </IconContext.Provider>
  )
}




IconOnlyButton.defaultProps = {
  color: '#000',
  size: '28px', 
  weight: 'regular', 
  label: 'button'
}

IconOnlyButton.propTypes = {
  icon: PropTypes.element,
  color: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default IconOnlyButton