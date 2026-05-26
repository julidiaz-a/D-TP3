import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { buscarCiudades } from '../services/servicioClima'
import TarjetaCiudad from '../components/TarjetaCiudad'
import CargandoSpinner from '../components/CargandoSpinner'
import MensajeError from '../components/MensajeError'

function PaginaResultados() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const consulta = searchParams.get('q') || ''
  const [valorInput, setValorInput] = useState(consulta)
  const [ciudades, setCiudades] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!consulta.trim()) return
    setValorInput(consulta)
    fetchCiudades(consulta)
  }, [consulta])

  const fetchCiudades = async (texto) => {
    setCargando(true)
    setError(null)
    setCiudades([])
    try {
      const resultados = await buscarCiudades(texto)
      setCiudades(resultados)
    } catch (err) {
      setError('No se pudo realizar la búsqueda. Verificá tu conexión.')
    } finally {
      setCargando(false)
    }
  }

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

      {cargando && <CargandoSpinner mensaje="Buscando ciudades..." />}

      {error && (
        <MensajeError
          mensaje={error}
          alReintentar={() => fetchCiudades(consulta)}
        />
      )}

      {!cargando && !error && ciudades.length > 0 && (
        <div className="results-list fade-in">
          {ciudades.map((ciudad) => (
            <TarjetaCiudad key={ciudad.place_id} ciudad={ciudad} />
          ))}
        </div>
      )}

      {!cargando && !error && ciudades.length === 0 && consulta && (
        <div className="results-empty fade-in">
          <span className="results-empty-icon">🌐</span>
          <p>No se encontraron resultados para <strong>"{consulta}"</strong></p>
          <p className="results-empty-hint">Probá con otro nombre o revisá la ortografía.</p>
        </div>
      )}
    </div>
  )
}

export default PaginaResultados
