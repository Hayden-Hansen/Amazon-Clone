import React from 'react'
import { useStateValue } from '../../StateProvider'
import Navbar from '../Navbar/Navbar';
import CurrencyFormat from 'react-currency-format'
import './Checkout.css'
import { getBasketTotal } from '../../reducer';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {

    const [{basket,user},dispatch] = useStateValue();

    const navigate = useNavigate();

    const signInHandler = () => {
      alert('You must be signed in before you can proceed to checkout!')
      navigate('/login')
    }

    const basketLengthHandler = () => {
      if(basket.length) {
        navigate('/address')
      }
      else {
        alert('You must have at least one item in your cart in order to proceed to checkout')
      }

    }

    const removeFromBasketHandler = (e,id) => {
      e.preventDefault();

      dispatch({
        type:'REMOVE_FROM_BASKET',
        id: id
      })

      
    }

    
  return (
    <div className='checkout'>
      <Navbar />
      <div className='main'>
        <div className='shopping-cart'>
          <h2>Shopping Cart</h2>

          {
            basket?.map((product) =>(
              <div className='product'>
            <div className='image'>
              <img src= {product.image} alt=''/>
            </div>
            <div className='checkout-description'>
              <h4>{product.title}</h4>
              <p>${product.price}</p>
              <button className='remove-button' onClick={(e) => removeFromBasketHandler(e,product.id)}>Remove</button>
            </div>
          </div>
            ))
          }

        </div>
          <div className='subtotal'>
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
            <button className='checkout-button' onClick={!user ? () => signInHandler() : () => basketLengthHandler()}>Proceed to Checkout</button>
          </div>
      </div>
    </div>
  )
}

export default Checkout
