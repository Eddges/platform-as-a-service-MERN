const express = require('express')
const http = require('http')
const userRouter = require('./routes/userRouter')
const mongoose = require('mongoose')
const config = require('./config/config')
const authenticationRouter = require('./routes/authenticationRouter')
const passport = require('passport')

const dbconnect = mongoose.connect(config.mongoURL)
.then((db) => {
    console.log('Connected to mongoDB')
})

const hostname = 'localhost'
const port = 5000


const app = express()

app.use(passport.initialize())

app.use('/todo', userRouter)
app.use('/user', authenticationRouter)

const server = http.createServer(app)


server.listen(port, hostname, (req, res) => {
    console.log('Server running on PORT : ', port)
})