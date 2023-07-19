// @desc   GET posts
// @route  /api/posts
// @access Private
const getPosts = (req, res) => {
    res.status(200).json({message: 'Get posts'})
}

// @desc   POST post
// @route  /api/posts
// @access Private
const createPost = (req, res) => {
    res.status(200).json({message: 'Create a post'})
}

// @desc   PUT post
// @route  /api/posts/:id
// @access Private
const updatePost = (req, res) => {
    res.status(200).json({message: `Update a post ${req.params.id}`})
}

// @desc   DELETE post
// @route  /api/posts/:id
// @access Private
const deletePost = (req, res) => {
    res.status(200).json({message: `Delete a post ${req.params.id}`})
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
}