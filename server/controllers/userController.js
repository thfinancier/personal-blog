const bcrypt = require('bcryptjs')
const jws = require('jsonwebtoken')
const errorCatcher = require('express-async-handler')
const User = require('../models/userModel')


// @desc   Register new user
// @route  /api/users/registration
// @access Public
const registerUser = errorCatcher(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all the fields')
    }

    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User with this email address already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a user
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc   Authenticate user
// @route  /api/users/login
// @access Public
const loginUser = errorCatcher(async (req, res) => {
    const {email, password} = req.body

    // Find user by email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })} else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
})

// @desc   Get user's data
// @route  /api/users/user-data
// @access Private
const getUserData = errorCatcher(async (req, res) => {
    res.send('Get user data')
})


module.exports = {
    registerUser,
    loginUser,
    getUserData
}