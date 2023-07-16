import './normalize.css'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { __autoLogin, __logout, clearError } from '@/redux/modules/auth'
import { useCallback, useEffect, useLayoutEffect } from 'react'
import * as S from './Layout.Style'
import Link from '@/components/Link'
import Button from '@/components/Button'
import usePopup from '@/hooks/usePopup'

const Layout = () => {
  const { isLoading,errorMessage, isError, isLogged, expiration } = useSelector((state)=> state.auth)
  const dispatch = useDispatch()
  const handleClickLogout = () => {
    dispatch(__logout())
  }
  const [openPopup] = usePopup()

  useLayoutEffect(()=>{
    const userData = localStorage.getItem('userData')
    if(userData) dispatch(__autoLogin())
  },[dispatch])
  
  useEffect(()=>{
    if(isLogged) {
      console.log('액세스 토큰 남은 시간: ',(new Date(expiration) - new Date())/1000)
    }
  },[isLogged, expiration])

  const onError = useCallback(async() => {
    await openPopup({title: errorMessage.title, contents: errorMessage.content})
    dispatch(clearError())
  },[errorMessage, openPopup, dispatch]) 

  useEffect(()=>{
    if(isError && errorMessage) {
      onError()
    }
  },[isError, errorMessage, onError])

  return (
    <S.Container>
    <S.HeaderContainer>
      <Link to='/'><S.HeaderTitle>Messenger</S.HeaderTitle></Link>
      <div>
      {isLogged ? <Link to='/m/write'>Write</Link> : ''}
      {isLogged ? <Button onClick={handleClickLogout}>logout</Button> : <Link to='/login'>Login</Link>}
      </div>
    </S.HeaderContainer>
    <S.Main>
      <Outlet/>
    </S.Main>
   </S.Container>
  )
}

export default Layout