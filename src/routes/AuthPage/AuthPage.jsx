import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';

const AuthPage = ({ children }) => {
  const { isLoading,isLogged } = useSelector((state)=>state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if(isLoading) return
    if(!isLogged) {
        alert('회원만 접근 가능합니다.')
        navigate('/')
    }
    
  },[isLogged, navigate,isLoading])

  if(isLoading || !isLogged) return null
  return (
    <>{children}</>
  )
}

AuthPage.propTypes = {
  children: PropTypes.element
}


export default AuthPage