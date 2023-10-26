const express = require('express')
const http = require('http')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000
const User = require('./model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const user = require('./model/user')
const auth = require('./middleware/auth')
const drugsRouter = require('./router/products')
const login = require('./router/login')
const mongoose = require('mongoose')
const  orderDrugs  = require('./router/orders')
const Drugs = require('./model/Drugs')
const purch_check = require('./router/purchases')
app.use(express.static('public'))
app.use(cookieParser());
app.use(express.json());



app.use('/', login)
app.use('/drugs', drugsRouter)
app.use('/orders', orderDrugs)
app.use('/purch-check',purch_check)






const start = async () => {
    try {

        app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}...`))
        await connectDB(process.env.MONGO_URI)
    } catch (error) {
        console.log(error)
    }
}

start()

