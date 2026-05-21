import { Link, useNavigate } from 'react-router-dom'
import '../src/App.css'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-icon">🌤️</span>
        <span className="navbar-title">WeatherCast</span>
      </Link>
      <button className="navbar-home-btn" onClick={() => navigate('/')}>
        Buscar ciudad
      </button>
    </nav>
  )
}

export default Navbar
