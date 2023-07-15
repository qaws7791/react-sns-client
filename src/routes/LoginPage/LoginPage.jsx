import Button from "@/components/Button"
import InputText from "@/components/InputText"
import Link from "@/components/Link"
import { __login, clearError } from "@/redux/modules/auth"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as S from './LoginPage.Style'
import usePopup from "@/hooks/usePopup"

const LoginPage = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const { isLogged,errorMessage,isError } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [openPopup] = usePopup()

  useEffect(()=>{
    if(isLogged) navigate('/')
  },[isLogged,navigate])

  const dispatch = useDispatch()

  const onSubmit = async (e) => {
  e.preventDefault()
  dispatch(__login({email, password}))
  }

  const onError = useCallback(async() => {
    await openPopup({title: '로그인 실패', contents: errorMessage})
    dispatch(clearError())
  },[errorMessage, openPopup, dispatch]) 

  useEffect(()=>{
    if(isError && errorMessage) {
      onError()
    }
  },[isError, errorMessage, onError])
  return (
    <S.Container>
      <h2>로그인</h2>
      <S.Form onSubmit={onSubmit}>
      <label htmlFor="email">Email: </label>
      <InputText autoComplete='email' type='email' id='email' name='email' placeholder='email' value={email} onChange={setEmail}/>
      <InputText autoComplete='current-password' type='password' placeholder='password' value={password} onChange={setPassword}/>
      <Button>로그인</Button>
      <div><span>아직 회원이 아니신가요?</span><Link to='/join'>회원가입</Link></div>
      </S.Form>
    </S.Container>
  )
}


export default LoginPage