import React from 'react'
import Rating from '@material-ui/lab/Rating';
import { useStateValue } from '../../StateProvider';
import './Card.css'

const Card = ({id,image, title, price, rating}) => {

    const [{basket},dispatch] = useStateValue();
    

    const addToBasketHandler = (e) => {
        e.preventDefault();

        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id,
                title,
                price,
                image,
                rating
            }
        })
    }

  return (
    <div className ='card'>
        <div className='card-image'>
            <img src={image} alt=''/>
        </div>
        <div className='card-description'>
            <h5>{title}</h5>
            <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
            <p>${price}</p>
            <button className='card-button' onClick={addToBasketHandler}>Add to Cart</button>
        </div>
    </div>
  )
}

export default Card
