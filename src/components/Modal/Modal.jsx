import * as S from './Modal.Style'
import PropTypes, { oneOfType } from 'prop-types';

const Modal = ({ isOpen, closeFunc, children }) => {
  if(!isOpen) return null
  return (
    <S.Container>
      <S.ModalBG onClick={closeFunc} />
      <S.ModalContent>
        {children}
      </S.ModalContent>
    </S.Container>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  closeFunc: PropTypes.func,
  children: oneOfType([PropTypes.string, PropTypes.element])
}

export default Modal