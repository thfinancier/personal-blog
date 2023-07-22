const mongoose = require('mongoose')

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`DB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        // "return" will only stop the function that contains the return statement. 
        // "process.exit" will stop ALL the functions that are running and stop all the tasks.
        process.exit(1)
    }
}

module.exports = connectDB