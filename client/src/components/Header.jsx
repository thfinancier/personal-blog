import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header>
        <nav>
            <Link to='/'>Create Post</Link>
            <Link to='/login'> <FaSignInAlt /> Login </Link>
            {user ? (
              <button onClick={onLogout}> <FaSignOutAlt /> Logout </button>
            ) : (
              <Link to='/registration'> <FaUser /> Register </Link>
            )}
        </nav>
    </header>
  )
}

export default Header
