import './App.css';
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Address from './components/Address/Address';
import Payment from './components/Payment/Payment';
import AddProduct from './components/AddProduct/AddProduct';
import Orders from './components/Orders/Orders'

import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';


const promise =  loadStripe(
  /*baseURL: THIS IS WHERE STRIPE INFORMATION WILL GO. I TOOK THIS AWAY AS IT IS PRIVATE INFORMATION*/
)

const App = () => {

  return (
    <Router>
    <div className='container'>
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/address' element={<Address />}/>
      <Route path='/payment' element={
      <Elements stripe={promise}>
        <Payment />
        </Elements>}/>
        <Route path='/addproduct' element={<AddProduct />}/>
        <Route path='/orders' element={<Orders />}/>
      </Routes>
    </div>
    </Router>
  )
}

export default App;
