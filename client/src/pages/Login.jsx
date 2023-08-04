import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import { Spinner } from '../components'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email, 
      password
    }

    dispatch(login(userData))
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
        <h2>User login</h2>
        <p>Here you can login into your account</p>
      </div>

      <form onSubmit={onSubmit}>
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
        <button type='submit'>Login</button>
      </form>
    </section>
  )
}

export default Login
