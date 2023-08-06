import { useDispatch } from 'react-redux'
import { deletePost } from '../features/posts/postSlice'

function PostPreview({post}) {

  const dispatch = useDispatch()

  return (
    <div>
        <h3>{post.title}</h3>
        <p>{new Date(post.createdAt).toLocaleString('en')}</p>
        <p>{post.text}</p>
        <button onClick={() => dispatch(deletePost(post._id))}>x</button>
    </div>
  )
}

export default PostPreview
