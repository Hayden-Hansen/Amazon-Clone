import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'
import { useStateValue } from '../../StateProvider'
import './Login.css'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [{}, dispatch] = useStateValue();

  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      alert('Please fill in all fields to sign in')
    } else {

      axios.post('/auth/login', {email,password})
      .then((res) => {
        if (!res.data.error) {
          dispatch({
            type: 'SET_USER',
            user: res.data
          });
  
  
          localStorage.setItem('user',JSON.stringify(res.data));
  
          navigate('/')
  
        } else if (res.data.error) {
          alert(res.data.error)
        }
  
  
      })
      .catch((err) => console.warn(err))
    }
  }

  return (
    <div className='login'>
      <div className='logo' onClick={() => navigate('/')}>
        <img src='Amazon-logo.jpg' alt=''/>
      </div>
      <form className='form'>
        <h3>Sign-In</h3>
      <div className='inputs'>
        <p>Email</p>
        <input type='email' placeholder='example@example.com' onChange={(e) => setEmail(e.target.value)} value={email}/>
        <p>Password</p>
        <input type='password' placeholder='*********' onChange={(e) => setPassword(e.target.value)} value={password}/>
      </div>
      <button className='login-button' onClick={loginHandler}>Login</button>
      <p className='info-text'>By continuing, you agree to Amazon's <span>Conditions of Use</span> and <span>Privacy Notice</span>.</p>
      </form>
      <button className='create-login-button' onClick={() => navigate('/signup')}>Create Account in Amazon</button>
    </div>
  )
}

export default Login
