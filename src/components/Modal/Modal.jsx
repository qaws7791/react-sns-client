import { styled } from 'styled-components'
import * as S from './Modal.Style'


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

export default Modal