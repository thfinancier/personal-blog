const express = require('express')
const colours = require('colors')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express()
const port = process.env.PORT || 3000

// is a method built-in in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json())
// is a method built-in in express to recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: false }))

app.use('/api/posts', require('./routes/postRoutes'))

app.use(errorHandler)


app.listen(port, () => console.log(`Server is running on port: ${port}`))
