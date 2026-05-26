import { useNavigate } from 'react-router-dom'

function TarjetaCiudad({ ciudad }) {
  const navigate = useNavigate()

  const nombreMostrado = ciudad.name || ciudad.display_name?.split(',')[0] || 'Ciudad desconocida'
  const pais = ciudad.address?.country || ''
  const provincia = ciudad.address?.state || ciudad.address?.region || ''
  const tipo = ciudad.type || ciudad.class || ''

  const handleClick = () => {
    const nombreCodificado = encodeURIComponent(nombreMostrado)
    navigate(`/clima/${ciudad.lat}/${ciudad.lon}/${nombreCodificado}`)
  }

  return (
    <div className="city-card fade-in" onClick={handleClick}>
      <div className="city-card-left">
        <span className="city-icon">📍</span>
        <div className="city-info">
          <h3 className="city-name">{nombreMostrado}</h3>
          <p className="city-detail">
            {[provincia, pais].filter(Boolean).join(', ')}
          </p>
        </div>
      </div>
      <div className="city-card-right">
        {tipo && <span className="city-type-badge">{tipo}</span>}
        <span className="city-arrow">→</span>
      </div>
    </div>
  )
}

export default TarjetaCiudad
