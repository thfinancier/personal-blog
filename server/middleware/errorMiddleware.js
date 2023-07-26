// it's better (easier, and more effective) to write errorHandler once that will handle all the errors
// in controllers, rather than write the same code in every "catch" block for each controller

const errorHandler = (err, req, res, next) => {
    // if not default status, then will throw an error with status 500 
    const statusCode = res.statusCode ? res.statusCode : 500

    // by default it's 400
    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = errorHandler