import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

function PaginaResultados() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const consulta = searchParams.get('q') || ''
  const [valorInput, setValorInput] = useState(consulta)

  // TODO: conectar con servicioClima.buscarCiudades()
  // TODO: manejar estados cargando / error

  const handleBuscar = (e) => {
    e.preventDefault()
    const texto = valorInput.trim()
    if (!texto) return
    navigate(`/resultados?q=${encodeURIComponent(texto)}`)
  }

  return (
    <div className="results-page">
      <div className="results-header fade-in">
        <button className="results-back-btn" onClick={() => navigate('/')}>
          ← Volver
        </button>
        <h2 className="results-title">
          Resultados para <span className="results-query">"{consulta}"</span>
        </h2>
      </div>

      <form className="results-search-form fade-in" onSubmit={handleBuscar}>
        <input
          type="text"
          className="results-search-input"
          value={valorInput}
          onChange={(e) => setValorInput(e.target.value)}
          placeholder="Nueva búsqueda..."
        />
        <button type="submit" className="results-search-btn">Buscar</button>
      </form>

      {/* TODO: mostrar CargandoSpinner mientras carga */}
      {/* TODO: mostrar MensajeError si hay error */}
      {/* TODO: mapear ciudades con TarjetaCiudad */}

      <div className="results-empty fade-in">
        <span className="results-empty-icon">🌐</span>
        <p>Resultados para <strong>"{consulta}"</strong> (próximamente)</p>
        <p className="results-empty-hint">La búsqueda real todavía no está conectada.</p>
      </div>
    </div>
  )
}

export default PaginaResultados
