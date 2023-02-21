import axios from 'axios'

const instance = axios.create({
    /*baseURL: THIS IS WHERE YOUR PUBLIC BAKCEND BASE URL WILL GO. I TOOK THIS AWAY AS IT IS PRIVATE INFORMATION*/
})

export default instance