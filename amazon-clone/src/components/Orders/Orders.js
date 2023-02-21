import React, {useState, useEffect} from 'react'
import './Orders.css'
import Navbar from '../Navbar/Navbar'
import axios from '../../axios'
import { useStateValue } from '../../StateProvider'

const Orders = () => {

    const [orders,setOrders] = useState([]);

    const [{user}] = useStateValue();



    useEffect(() => {
        axios.post('/orders/get', {email: user.email})
        .then((res) => setOrders(res.data)) 

    },[])



  return (
    <div className='orders'>
        <Navbar />
        <div className='orders-main'>
            <div className='orders-container'>
                <h2>Your Orders</h2>

                {orders.length ?
                    orders.map((order) => (
                <div className='orders-details'>
                    <div className='orders-address'>
                        <h4>Shipping Address</h4>

                        <div>
                            <p>{order.address.fullName}</p>
                            <p>{order.address.streetaddress}</p>
                            <p>{order.address.city}</p>
                            <p>{order.address.state}</p>
                            <p>{order.address.phone}</p>
                        </div>   
                    </div>
                    <div className='orders-basket'>
                        <h4>Order</h4>
                        <p>Subtotal: $ <span className='span'>{order.price}</span></p>

                        {
                            order.products.map((product) => (
                            <div className='orders-product'>
                                <div className='orders-image'>
                                    <img src= {product.image} alt=''/>
                                </div>
                            <div className='orders-description'>
                                <h4>{product.title}</h4>
                                <p>${product.price}</p>
                            </div>
                            </div>
                            ))
                            }
                    </div>
                </div>

                    )) : <div>You have not placed any orders yet!</div>
                 }
            </div>
        </div>
    </div>
  )
}

export default Orders
