import { useState } from 'react'
import './Inicio.css'

const POPULAR_CITIES = ['Buenos Aires', 'Madrid', 'Nueva York', 'Londres', 'Tokio', 'París']

function SearchPage() {
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // TODO: navegar a /results
    console.log('Buscar:', query)
  }

  return (
    <div className="search-page">
      <div className="search-hero fade-in">
        <div className="search-weather-emoji">🌍</div>
        <h1 className="search-title">
          Buscá el clima <br />
          <span className="search-title-accent">de cualquier ciudad</span>
        </h1>
        <p className="search-subtitle">
          Pronóstico actual y para los próximos 7 días
        </p>
      </div>

      <form className="search-form fade-in fade-in-delay-1" onSubmit={handleSearch}>
        <div className="search-input-group">
          <span className="search-input-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Ej: Córdoba, Madrid, Miami..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <button type="submit" className="search-btn" disabled={!query.trim()}>
          Buscar
        </button>
      </form>

      <div className="search-popular fade-in fade-in-delay-2">
        <p className="search-popular-label">Ciudades populares</p>
        <div className="search-popular-tags">
          {POPULAR_CITIES.map((city) => (
            <button key={city} className="search-tag" onClick={() => console.log(city)}>
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className="search-features fade-in fade-in-delay-3">
        <div className="feature-item">
          <span className="feature-icon">🌡️</span>
          <span className="feature-label">Temperatura y sensación</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">💧</span>
          <span className="feature-label">Humedad y precipitaciones</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">📅</span>
          <span className="feature-label">Pronóstico 7 días</span>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
