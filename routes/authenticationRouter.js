const express = require('express')
const bodyParser = require('body-parser')
const User = require('../models/user')
const passport = require('passport')

const authenticate = require('../config/authenticate')
const cors = require('../config/cors')

const authenticationRouter = express.Router()
authenticationRouter.use(bodyParser.json())

authenticationRouter.route('/signup')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200} )
.post(cors.corsWithOptions, (req, res, next) => {

    User.register(new User({username : req.body.username}), req.body.password, (err, user) => {
        if(err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.json({err : err})
        }
        else{
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({user : req.user, success : true, message : 'Registration Successful!'})
            })
        }
    })

})

authenticationRouter.route('/login')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200 })
.post(cors.corsWithOptions, passport.authenticate('local'), (req, res, next) => {
    console.log('Local authentication successful!')
    const token = authenticate.getToken({_id : req.user._id})
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({success : true, token : token, message : 'Login Successful'})
})

module.exports = authenticationRouter