import React, {useState} from 'react'
import './Address.css'
import Navbar from '../Navbar/Navbar'
import { useStateValue } from '../../StateProvider'
import { useNavigate } from 'react-router-dom'

const Address = () => {

    const navigate = useNavigate()
  
    const [{address}, dispatch] = useStateValue();

    const [fullName,setFullName] = useState('')
    const [phone,setPhone] = useState('')
    const [streetaddress,setStreetAddress] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')

    const deliverHandler = (e) => {
        e.preventDefault();

        dispatch({
            type: 'SET_ADDRESS',
            item: {
                fullName,
                phone,
                streetaddress,
                city,
                state
            }
        });

        navigate('/payment')
    }

    return (
    <div className='address'>
      <Navbar />
      <div className='form-main'>
      <form className='form-container'>
      <div className='form-inputs'>
        <p>Full Name</p>
        <input type='text' placeholder='John Smith' onChange={(e) => setFullName(e.target.value)} value={fullName}/>
      </div>
      <div className='form-inputs'>
        <p>Phone Number</p>
        <input type='text' onChange={(e) => setPhone(e.target.value)} value={phone}/>
      </div>
      <div className='form-inputs'>
        <p>Street Address</p>
        <input type='text' onChange={(e) => setStreetAddress(e.target.value)} value={streetaddress}/>
      </div>
      <div className='form-inputs'>
        <p>City</p>
        <input type='text' onChange={(e) => setCity(e.target.value)} value={city}/>
      </div>
      <div className='form-inputs'>
        <p>State/Providence</p>
        <input type='text' onChange={(e) => setState(e.target.value)} value={state}/>
      </div>
      <button className='address-button' onClick={deliverHandler}>Deliver to this Address</button>
      </form>
      </div>
    </div>
  )
}

export default Address
