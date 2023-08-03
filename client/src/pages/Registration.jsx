import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import { Spinner } from '../components'

function Registration() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  useEffect(() => {

    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section>
      <div>
        <h2>User regisration</h2>
        <p>Here you can create an account</p>
      </div>

      <form onSubmit={onSubmit}>
        <label>Full name</label>
        <input 
          type='text'
          id='full-name'
          value={name}
          placeholder='Full name'
          onChange={(e) => setName(e.target.value)}
        />
        <label>E-Mail</label>
        <input 
          type='email'
          id='email'
          value={email}
          placeholder='E-Mail'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input 
          type='password'
          id='password'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm password</label>
        <input 
          type='password'
          id='password2'
          value={password2}
          placeholder='Confirm password'
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type='submit'>Register</button>
      </form>
    </section>
  )
}

export default Registration
