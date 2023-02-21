import React, {useState} from 'react'
import './AddProduct.css'
import axios from '../../axios';
import { useNavigate } from 'react-router-dom'


const AddProduct = () => {

    const [title, setTitle] = useState('');

    const [imageURL,setImageURL] = useState('');

    const [price,setPrice] = useState(0);

    const [rating,setRating] = useState(0);

    const navigate = useNavigate();

    const addProductHandler = e => {
        e.preventDefault();

        if(title === '' || imageURL == '') {
          alert('Pease fill out all fields to add a prouct')
        }
        else {

          axios.post('/products/add', {
            title,
            imageURL,
            price,
            rating
        }).then(() => {
            setTitle('')
            setImageURL('')
            setPrice(0)
            setRating(0)
        }).catch((err) => alert(err.message))


        alert('Product has been added!')
        navigate('/')

        }

    }

  return (
    <div className='addproduct'>
     <div className='product-logo'>
        <img src='Amazon-logo.jpg' alt='' onClick={() => navigate('/')}/>
      </div>
      <form className='product-form'>
        <h3>Add Product</h3>
      <div className='product-inputs'>
        <p>Title</p>
        <input type='text' onChange={(e) =>setTitle(e.target.value)} value={title}/>
        <p>Image URL</p>
        <input type='text' onChange={(e) =>setImageURL(e.target.value)} value={imageURL}/>
        <p>Price</p>
        <input type='number' onChange={(e) =>setPrice(e.target.value)} value={price}/>
        <p>Rating</p>
        <input type='number' onChange={(e) =>setRating(e.target.value)} value={rating}/>
      </div>
      <button className='product-login-button' onClick={addProductHandler}>Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct
