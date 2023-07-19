const express = require('express')
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/postController')
const router = express.Router()

router.route('/').get(getPosts).post(createPost)
// the line above is an equivalent to the two lines below, but shorter
// router.get('/', getPosts)
// router.post('/', createPost)

router.route('/:id').put(updatePost).delete(deletePost)
// the line above is an equivalent to the two lines below, but shorter
// router.put('/:id', updatePost)
// router.delete('/:id', deletePost)



module.exports = router