const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add the title']
    },

    text: {
        type: String,
        required: [true, 'Please add the text']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)