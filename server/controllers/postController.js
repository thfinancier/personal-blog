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

    const post = await Post.create({
        title: req.body.title,
        text: req.body.text
    })

    res.status(200).json(post)
})

// @desc   PUT post
// @route  /api/posts/:id
// @access Private
const updatePost = asyncHnadler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(404)
        throw new Error ('Post is not found')
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
const deletePost = asyncHnadler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(404)
        throw new Error('Post is not found')
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