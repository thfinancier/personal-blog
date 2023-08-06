import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../features/posts/postSlice'

function PostForm() {

  const [title, setTitle] = useState('')  
  const [text, setText] = useState('') 
  const postData = {
    title,
    text
  } 

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(createPost(postData))
    setTitle('')
    setText('')
  }

  return (
    <section className='form'>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input 
            type='text'
            id='title'
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
            /> 
            <label>Text</label>
            <input 
            type='text'
            id='text'
            value={text}
            placeholder='Text'
            onChange={(e) => setText(e.target.value)}
            /> 
            <button type='submit'>Create</button>
        </form>
    </section>
  )
}

export default PostForm
