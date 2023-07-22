const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: text,
        required: [true, 'Please add the title']
    },

    text: {
        type: text,
        required: [true, 'Please add the text']
    },
}, {
    timestamps: trie
})

module.exports = mongoose.model('Post', postSchema)