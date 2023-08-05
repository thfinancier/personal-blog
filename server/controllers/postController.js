// Errors should be caught, and in order to do that try catch method is used.
// But to avoid writing try catch method in every controller function
// express-async-handler which is the function that catches the error and in my case passes 
// it in errorHandler function could be used. 

// !!! express-async-handler is A CATCH BLOCK under the hood that runs "next()" inside it. 
// It catches an error and passes it on to the error handling route 
// or in other words IT PASSES AN ERROR IN errorHandler function, witch act as a MIDDLEWARE 
const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')
const User = require('../models/userModel')

// @desc   GET posts
// @route  /api/posts
// @access Private
const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ user: req.user.id })
    res.status(200).json(posts)
})

// @desc   POST post
// @route  /api/posts
// @access Private
const createPost = asyncHandler(async (req, res) => {
    
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const post = await Post.create({
        user: req.user.id,
        title: req.body.title,
        text: req.body.text
    })

    res.status(200).json(post)
})

// @desc   PUT post
// @route  /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(404)
        throw new Error ('Post is not found')
    }

    // Check for user
    if (!req.user) {
        res.status(400)
        throw new Error('User is not found')
    }

    // Make sure the logged in user matches post user 
    if (post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User is not authorised')
    }

    // You should set the new option to true to return the document after update was applied.
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPost)
})

// @desc   DELETE post
// @route  /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(404)
        throw new Error('Post is not found')
    }

    // Check for user
    if (!req.user) {
        res.status(400)
        throw new Error('User is not found')
    }

    // Make sure the logged in user have rights to update this post
    if (post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User is not authorised')
    }

    // await Post.findByIdAndRemove(post)
    // another option is:
    await post.deleteOne()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
}