import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Login, Registration } from './pages'
import Header from './components'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
