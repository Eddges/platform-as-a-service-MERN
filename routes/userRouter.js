const express = require('express')
const bodyParser = require('body-parser')
const cors = require('../config/cors')
const User = require('../models/user')
const authenticate = require('../config/authenticate')

const userRouter = express.Router()
userRouter.use(bodyParser.json())

userRouter.route('/')

.options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200 })

.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    
    console.log(req.headers.authorization)
    User.findOne({_id : req.user._id})
    .then((user) => {
        if(user){
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(user)
        }
        else{
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.json(user)
        }
    })
})

.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

    User.findOne({_id : req.user._id})
    .then(user => {
        if(user) {
            user.tasks.push(req.body.task)
            user.save()
            .then(doc => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(doc)
            })
            .catch(err => {
                return next(err)
            })
        }
        else{
            console.log('User does not exist')
            User.create({name : req.body.name})
            .then(newuser => {
                newuser.tasks.push(req.body.task)
                newuser.save()
                .then(doc => {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.json(doc)
                })
            })
        }
    })
})

module.exports = userRouter