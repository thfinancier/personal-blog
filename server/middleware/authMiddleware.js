const jwt = require('jsonwebtoken')
const errorCatcher = require('express-async-handler')
const User = require('../models/userModel')

const protect = errorCatcher(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token and assign it to req.user
            // req.user is a custom key
            // From jwt token payload could be grabbed
            // select('-password') ensures that password wont be included
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorised')
        }
    }

    // If first if is not run, then nothing was assigned to token variable and it means that someone not authenticated
    // is trying to access protected routes
    if (!token) {
        res.status(401)
        throw new Error('Not authorised, no token')
    }
})

module.exports = protect