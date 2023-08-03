import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
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
