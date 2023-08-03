import { Link } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

function Header() {
  return (
    <header>
        <nav>
            <Link to='/'>Create Post</Link>
            <Link to='/login'> <FaSignInAlt /> Login </Link>
            <Link to='/registration'> <FaUser /> Register </Link>
        </nav>
    </header>
  )
}

export default Header
