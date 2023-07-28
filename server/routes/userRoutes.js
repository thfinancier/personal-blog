const express = require('express')
const { registerUser, loginUser, getUserData } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/registration', registerUser)
router.post('/login', loginUser)
router.get('/user-data', protect, getUserData)

module.exports = router