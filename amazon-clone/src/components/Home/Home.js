import React, {useState,useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import Card from '../Card/Card'
import './Home.css'
import axios from '../../axios'

const Home = () => {

  const[products,setProducts] = useState('')

  useEffect(() => {
  
    const fetchData = async () => {
        const data = await axios.get('/products/get');
        setProducts(data)
       }

    fetchData()

  },[])


  return (
    <div className='home'>
      <Navbar/>
      <div className='banner'>
        <img src='banner.jpg' alt=''/>
        <img src='mobile_banner.jpg' alt=''/>
      </div>
      <div className='home-main'>    
      {
        products && products?.data.map((
          product) => (<Card id={product._id} image={product.imageURL} price={product.price} rating={product.rating} title={product.title}/>)
          )
      }
      </div>
    </div>
  )
}

export default Home
