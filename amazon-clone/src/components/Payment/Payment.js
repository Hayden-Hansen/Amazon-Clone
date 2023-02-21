import React, {useEffect, useState} from 'react'
import Navbar from '../Navbar/Navbar'
import { useStateValue } from '../../StateProvider';
import './Payment.css'
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../reducer';
import { Navigate, useNavigate } from 'react-router-dom';
import {CardElement,useElements,useStripe} from '@stripe/react-stripe-js'
import axios from '../../axios';



const Payment = () => {
    const [{address,basket,user},dispatch] = useStateValue();

    const [clientSecret,setClientSecret] = useState('');

    const navigate = useNavigate();

    const elements = useElements();

    const stripe = useStripe();

    useEffect(() => {

        const fetchclientSecret = async() => {
          const data = await axios.post('/payment/create',{
            amount: getBasketTotal(basket)
          });

          setClientSecret(data.data.clientSecret)
  
        }

        fetchclientSecret(console.log('client secret is:',clientSecret));

    },[]);



    const confirmPayment = async (e) => {
      e.preventDefault();

      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      }).then((res) => {

        axios.post('/orders/add', {
          basket: basket,
          price: getBasketTotal(basket),
          email: user?.email,
          address: address
        })

        dispatch({
          type: 'EMPTY_BASKET'
        })
        navigate('/')
    }).catch(err => console.warn(err.message))

    }


  return (
    <div className='payment'>
     <Navbar />
     <div className='payment-main'>
        <div className='payment-review'>
            <h2>Review Your Order</h2>
            <div className='payment-address'>
                <h5>Shipping Address</h5>
                <div>
                    <p>{address.fullName}</p>
                    <p>{address.streetaddress}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>Phone: {address.phone}</p>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <div className='payment-method'>
              <h5>Payment Method</h5>
              <div>
                <p>Card Details</p>

                <CardElement />

                </div>
            </div>
            <div className='payment-order'>
              <h5>Your Order:</h5>

              <div>
              {
            basket?.map((product) =>(
              <div className='payment-product'>
            <div className='payment-image'>
              <img src= {product.image} alt=''/>
            </div>
            <div className='payment-description'>
              <h4>{product.title}</h4>
              <p>${product.price}</p>
            </div>
          </div>
               ))
               }
              </div>
            </div>
        </div>
        <div className='payment-subtotal'>
        <CurrencyFormat renderText={(value) => (
              <>
              <p>
                Subtotal  ({basket.length} items): 
                 <strong> {value}</strong>
              </p>
              <small>
                <input type='checkbox'/>
                <span>This order contains a gift.</span>
              </small>
              </>
            )} decimalScale={2}
            value={getBasketTotal(basket)}
            displayType='text'
            thousandSeparator={true}
            prefix={'$'}
            />
            <button className='payment-butoon' onClick={confirmPayment}>Place Order</button>
        </div>
     </div>
    </div>
  )
}

export default Payment
