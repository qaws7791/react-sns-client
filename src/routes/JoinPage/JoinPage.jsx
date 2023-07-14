import Button from "@/components/Button"
import InputText from "@/components/InputText"
import Link from "@/components/Link"
import { __join } from "@/redux/modules/auth"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const JoinPage = () => {
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const { isLogged } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(()=>{
    if(isLogged) navigate('/')
  },[isLogged,navigate])

  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(__join({name,email,password}))
  }


  return (
    <Container>
      <h2>회원가입</h2>
      <Form onSubmit={onSubmit}>
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
      </Form>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`

const Form = styled.form`
  width: 400px;
  gap: 13px;
  display: flex;
  flex-direction: column;
`

export default JoinPage