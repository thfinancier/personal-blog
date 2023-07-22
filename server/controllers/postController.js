const asyncHnadler = require('express-async-handler')
const Post = require('../models/postModel')

// @desc   GET posts
// @route  /api/posts
// @access Private
const getPosts = asyncHnadler(async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
})

// @desc   POST post
// @route  /api/posts
// @access Private
const createPost = asyncHnadler(async (req, res) => {
    
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({message: 'Create a post'})
})

// @desc   PUT post
// @route  /api/posts/:id
// @access Private
const updatePost = asyncHnadler(async (req, res) => {
    res.status(200).json({message: `Update a post ${req.params.id}`})
})

// @desc   DELETE post
// @route  /api/posts/:id
// @access Private
const deletePost = asyncHnadler(async (req, res) => {
    res.status(200).json({message: `Delete a post ${req.params.id}`})
})

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
}