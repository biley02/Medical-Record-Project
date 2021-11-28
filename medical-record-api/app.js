// Require express and create an instance of it
var express = require('express');
const path = require('path')
const cors=require('cors')
const mongoose = require('mongoose')
const connect_flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')

var app = express();
app.use(express.json())
app.use(cookieParser())

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// app.use(express.static('public'))

// using dotenv module for environment
require('dotenv').config()

const port=process.env.PORT || 8080

mongoose
    .connect('mongodb+srv://Rishiraj:abcABC%40123@cluster0.nm4oa.mongodb.net/Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    })
    .then(() => console.log('Connected to mongo server'))
    .catch((err) => console.error(err))


    const publicDirectory = path.join(__dirname, '../public')
    // console.log(publicDirectory);
    app.use(express.static(publicDirectory))   

    app.use(express.urlencoded({ extended: false }))

    app.use(
        session({
            secret: process.env.JWT_SECRET,
            resave: true,
            saveUninitialized: true,
        })
    )

    const indexRoutes = require('./routes/index')
    const userRoutes = require('./routes/user')
    const hospitalRoutes=require('./routes/hospital')


    app.use('/',indexRoutes)
    app.use('/user',userRoutes)
    app.use('/hospital',hospitalRoutes)



// start the server in the port 3000 !
app.listen(port, function () {
    console.log('Example app listening on port :',port);
});
