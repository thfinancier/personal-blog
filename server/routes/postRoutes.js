const express = require('express')
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/postController')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').get(protect, getPosts).post(protect, createPost)
// the line above is an equivalent to the two lines below, but shorter
// router.get('/', getPosts)
// router.post('/', createPost)

router.route('/:id').put(protect, updatePost).delete(protect, deletePost)
// the line above is an equivalent to the two lines below, but shorter
// router.put('/:id', updatePost)
// router.delete('/:id', deletePost)



module.exports = router