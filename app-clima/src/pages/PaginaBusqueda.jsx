import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CIUDADES_POPULARES = ['Buenos Aires', 'Madrid', 'Nueva York', 'Londres', 'Tokio', 'París']

function PaginaBusqueda() {
  const [consulta, setConsulta] = useState('')
  const navigate = useNavigate()

  const handleBuscar = (e) => {
    e.preventDefault()
    const texto = consulta.trim()
    if (!texto) return
    navigate(`/resultados?q=${encodeURIComponent(texto)}`)
  }

  const handlePopular = (ciudad) => {
    navigate(`/resultados?q=${encodeURIComponent(ciudad)}`)
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

      <form className="search-form fade-in fade-in-delay-1" onSubmit={handleBuscar}>
        <div className="search-input-group">
          <span className="search-input-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Ej: Córdoba, Madrid, Miami..."
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            autoFocus
          />
        </div>
        <button type="submit" className="search-btn" disabled={!consulta.trim()}>
          Buscar
        </button>
      </form>

      <div className="search-popular fade-in fade-in-delay-2">
        <p className="search-popular-label">Ciudades populares</p>
        <div className="search-popular-tags">
          {CIUDADES_POPULARES.map((ciudad) => (
            <button key={ciudad} className="search-tag" onClick={() => handlePopular(ciudad)}>
              {ciudad}
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

export default PaginaBusqueda
