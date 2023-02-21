const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Products = require('./Products')
const Users = require('./Users')
const Orders = require('./Orders')
const bcrypt = require('bcryptjs')
const stripe = require('stripe')/*THIS IS WHERE YOUR STRIPE INFORMATION WILL GO. I TOOK THIS AWAY AS IT IS PRIVATE INFORMATION*/

const app = express()

const port = 8000

app.use(express.json())
app.use(cors())


const url = /*THIS IS WHERE YOUR MONGODB LINK WILL GO. I TOOK THIS AWAY AS IT IS PRIVATE INFORMATION*/


mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.get('/',(req,res) => {
    res.status(200).send('hello world!')
})

//SIGNUP

app.post('/auth/signup', async (req,res) => {

    const {fullName, email, password} = req.body;

    const securePassword = await bcrypt.hash(password,10);

    const userDetail = {
        fullName: fullName,
        email: email,
        password: securePassword
    }

    const currentUser = await Users.findOne({email: email});

    if (currentUser) {
        res.send({message: 'This email is already in use! Please sig in using the login page or sign up with another email!'})
    }
    else {
        Users.create(userDetail, (err, res) => {
            if (err) {
                //res.status(500).send({message: err.message})
                console.log(err.message)
            }
            else {
                //res.status(200).send({message: 'Successfully signed in!'})
                console.log('success!')
            }
        })
    }
})

//LOGIN

app.post('/auth/login', async (req,res) => {

    const {email, password} = req.body;
    
    const userDetail = await Users.findOne({email: email});

    if(userDetail) {
        if (await bcrypt.compare(password,userDetail.password)) {
            res.send(userDetail)
        } else {
            res.send({error: 'Either your email or password is incorrect!'}) 
        }
    }
    else {
        res.send({error: 'user does not exist! Please use the sign up page to create an account!'})
    }

})


app.get('/products/get', (req,res) => {
    Products.find((err,data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})


app.post('/products/add', (req,res) => {
    const productDetail = req.body;

    console.log(productDetail)

    Products.create(productDetail, (err,data) => 
    {
    if (err) {
        res.status(500).send(err.message)

    } else {
        res.status(201).send(data)
    }

    }
    )
})


app.post('/payment/create', async (req,res) => {
    const total = req.body.amount
    console.log(total);

    const payment = await stripe.paymentIntents.create({
        amount: total*100,
        currency: 'USD'
    });

    res.status(201).send({
        clientSecret: payment.client_secret
    })
})

//Order Details

app.post('/orders/add', (req,res) => {
    const products = req.body.basket
    const price = req.body.price
    const email = req.body.email
    const address = req.body.address

    const orderDetail = {
        products: products,
        price: price,
        address: address,
        email: email
    }

    
    Orders.create(orderDetail, (err,result) => {
        if (err) {
            console.group(err.message)
        } else {
            console.log(res)
        }
    })
});


app.post('/orders/get',  (req,res) => {
    const email = req.body.email;

    Orders.find((err,result) => {
        if (err) {
            console.log(err.message)
        } else {
            const userOrders = result.filter(order => order.email === email)
            res.send(userOrders)
        }
    })
})


app.listen(port, () => {
    console.log(`listening on port ${port}!`)
})
