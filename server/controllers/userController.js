const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
            email: user.email,
            // _id is a mongodb primary key and it's set by mongo (it's long and ugly)
            // while id (without an underscore) could be set by user
            // ! Though value is the value
            token: generateToken(user._id)
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
            email: user.email,
            token: generateToken(user._id)
        })} else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
})

// @desc   Get user's data
// @route  /api/users/user-data
// @access Private
const getUserData = errorCatcher(async (req, res) => {
    // const { id, name, email } = await User.findById(req.user.id)

    // res.status(200).json({
    //     id,
    //     name,
    //     email
    // })

    // Could be simplified to this
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getUserData
}