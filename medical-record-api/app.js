// Require express and create an instance of it
var express = require('express');
var app = express();
const path = require('path')

const mongoose = require('mongoose')
const connect_flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(express.json())
// app.use(express.static('public'))
app.use(cookieParser())
// using dotenv module for environment
require('dotenv').config()

const port=process.env.PORT || 8080

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to mongo server'))
    .catch((err) => console.error(err))


    const publicDirectory = path.join(__dirname, '../public')
    // console.log(publicDirectory);
    app.use(express.static(publicDirectory))   

    app.use(express.urlencoded({ extended: true }))

    app.use(
        session({
            secret: process.env.JWT_SECRET,
            resave: true,
            saveUninitialized: true,
        })
    )

    const indexRoutes = require('./routes/index')
    const userRoutes = require('./routes/user')


    app.use('/',indexRoutes)
    app.use('/user',userRoutes)



// start the server in the port 3000 !
app.listen(port, function () {
    console.log('Example app listening on port :',port);
});
