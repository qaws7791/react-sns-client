import Button from "@/components/Button"
import InputText from "@/components/InputText"
import Link from "@/components/Link"
import { __join, clearError } from "@/redux/modules/auth"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as S from './JoinPage.Style'
import usePopup from "@/hooks/usePopup"

const JoinPage = () => {
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const { isLogged,isError, errorMessage } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [openPopup] = usePopup()

  useEffect(()=>{
    if(isLogged) navigate('/')
  },[isLogged,navigate])

  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch(__join({name,email,password}))
  }


  const onError = useCallback(async(errorMessage) => {
    await openPopup({title: '가입 실패', contents: errorMessage})
    dispatch(clearError())
  },[openPopup,dispatch]) 

  useEffect(()=>{
    console.log(isError,errorMessage,onError)
    if(isError && errorMessage) {
      onError(errorMessage)
    }
  },[isError,errorMessage,onError])

  return (
    <S.Container>
      <h2>회원가입</h2>
      <S.JoinForm onSubmit={onSubmit}>
          <label htmlFor="name">Name: </label>
          <InputText 
            required 
            id='name'
            name='name'
            placeholder='Your Name' 
            value={name} 
            onChange={setName}
            minLength='4'
            pattern="[a-zA-Z0-9]{4,}"
            errorText="영문 또는 숫자를 포함하는 4개 이상의 문자"
          />
          <label htmlFor="email">Email: </label>
          <InputText
            id='email'
            name='email'
            type='email' 
            required 
            placeholder='Email address' 
            value={email} 
            onChange={setEmail}
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            errorText="올바른 이메일 형식이 아닙니다."
            autoComplete="new-password"
          />
          <label htmlFor="password">Password: </label>
          <InputText 
            id='password'
            name='password'
            type='password' 
            required  
            placeholder='Password' 
            value={password} 
            onChange={setPassword}
            minLength='4'
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            errorText="최소 1개 이상의 대문자와 소문자 그리고 숫자를 포함하는 8개 이상의 문자"
            autoComplete="new-password"
          />
         <Button>가입</Button>
         <div><span>이미 아이디가 있으신가요?</span><Link to='/login'>로그인</Link></div>
      </S.JoinForm>
    </S.Container>
  )
}

export default JoinPage