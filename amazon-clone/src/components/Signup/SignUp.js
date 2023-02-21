import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import axios from '../../axios'
import './SignUp.css'


const SignUp = () => {

  const [{}, dispatch] = useStateValue();


  const [fullName, setFullName] = useState('')


  const [email,setEmail] = useState('')

  const [password,setPassword] = useState('')

  const navigate = useNavigate();


  const signUpHandler = (e) => {
    e.preventDefault();

    if(fullName === '' || email === '' || password === '') {
      alert("Please fill out all fields in to sign up")
    } else {
      axios.post('/auth/signup', {email,password,fullName})
      .then((res) => alert(res.data.message))
      .catch((err) => console.warn(err)) 
  
      navigate('/')

    }
  }


  return (
    <div className='signup'>
        <div className='logo' onClick={() => navigate('/')}>
        <img src='Amazon-logo.jpg' alt=''/>
       </div>
       <form className='form'>
        <h3>Sign-Up</h3>
      <div className='inputs'>
        <p>Full Name</p>
        <input type='text' placeholder='John Smith' onChange={(e) => setFullName(e.target.value)} value={fullName}/>
        <p>Email</p>
        <input type='email' placeholder='example@example.com' onChange={(e) => setEmail(e.target.value)} value={email}/>
        <p>Password</p>
        <input type='password' placeholder='*********' onChange={(e) => setPassword(e.target.value)} value={password}/>
      </div>
      <button className='signup-button' onClick={signUpHandler}>Create Account in Amazon</button>
      </form>
      <button className='backto-login-button' onClick={() => navigate('/login')}>Back to Login</button>
      </div>
  )
}

export default SignUp
