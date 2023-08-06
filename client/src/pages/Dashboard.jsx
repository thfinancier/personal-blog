import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PostForm, PostPreview } from '../components'
import { Spinner } from '../components'
import { getPosts, reset } from '../features/posts/postSlice'

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { posts, isError, isLoading, message } = useSelector((state) => state.posts)

  useEffect(() => {

    if (isError) {
      setTimeout(() => {
        console.error(message)
      }, 2000)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getPosts())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section>
        <h1>Welcome {user && user.name}</h1>
        <p>Posts Dashboard</p>
      </section>

      <PostForm />

      <section>
        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <PostPreview key={post._id} post={post} />
            ))}
          </div>
        ) : (<h3>You don't have any posts</h3>)}
      </section>
    </>
  )
}

export default Dashboard
