import './normalize.css'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { __loadUser, __logout } from '@/redux/modules/auth'
import { useEffect, useLayoutEffect } from 'react'
import * as S from './Layout.Style'
import Link from '@/components/Link'
import Button from '@/components/Button'

const Layout = () => {
  const { isLoading,isLogged, expiration } = useSelector((state)=> state.auth)
  const dispatch = useDispatch()
  const handleClickLogout = () => {
    dispatch(__logout())
  }

  useLayoutEffect(()=>{
    dispatch(__loadUser())
  },[dispatch])
  
  useEffect(()=>{
    if(isLogged) {
      console.log((new Date(expiration) - new Date())/1000)
    }
  },[isLogged, expiration])

  if (isLoading) return null
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