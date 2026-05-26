import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { obtenerPronosticoClima } from '../services/servicioClima'
import { obtenerInfoClima, obtenerColorGrupo } from '../utils/utilidadesClima'
import TarjetaPronostico from '../components/TarjetaPronostico'
import CargandoSpinner from '../components/CargandoSpinner'
import MensajeError from '../components/MensajeError'

function PaginaDetalleClima() {
  const { lat, lon, nombre } = useParams()
  const navigate = useNavigate()
  const nombreCiudad = decodeURIComponent(nombre)

  const [clima, setClima] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchClima()
  }, [lat, lon])

  const fetchClima = async () => {
    setCargando(true)
    setError(null)
    try {
      const datos = await obtenerPronosticoClima(lat, lon)
      setClima(datos)
    } catch (err) {
      setError('No se pudo obtener el clima. Verificá tu conexión.')
    } finally {
      setCargando(false)
    }
  }

  const actual = clima?.current
  const diario = clima?.daily
  const infoClima = actual ? obtenerInfoClima(actual.weather_code) : null
  const colorAcento = actual ? obtenerColorGrupo(actual.weather_code) : 'var(--accent)'

  return (
    <div className="detail-page">
      <button className="detail-back-btn fade-in" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      {cargando && <CargandoSpinner mensaje="Obteniendo el clima..." />}

      {error && (
        <MensajeError mensaje={error} alReintentar={fetchClima} />
      )}

      {!cargando && !error && clima && (
        <>
          <div
            className="detail-hero fade-in"
            style={{ '--accent-local': colorAcento }}
          >
            <div className="detail-hero-top">
              <div className="detail-city-info">
                <h1 className="detail-city-name">{nombreCiudad}</h1>
                <p className="detail-coords">
                  {parseFloat(lat).toFixed(4)}, {parseFloat(lon).toFixed(4)}
                </p>
              </div>
              <div className="detail-hero-right">
                <span className="detail-big-icon">{infoClima?.icono}</span>
                <p className="detail-condition">{infoClima?.etiqueta}</p>
              </div>
            </div>

            <div className="detail-temp-row">
              <span className="detail-temp-main">
                {Math.round(actual.temperature_2m)}°C
              </span>
            </div>

            <div className="detail-stats-grid">
              <div className="stat-block">
                <span className="stat-icon">🌡️</span>
                <div className="stat-info">
                  <span className="stat-label">Sensación</span>
                  <span className="stat-value">
                    {Math.round(actual.apparent_temperature)}
                    <span className="stat-unit">°C</span>
                  </span>
                </div>
              </div>
              <div className="stat-block">
                <span className="stat-icon">💧</span>
                <div className="stat-info">
                  <span className="stat-label">Humedad</span>
                  <span className="stat-value">
                    {actual.relative_humidity_2m}
                    <span className="stat-unit">%</span>
                  </span>
                </div>
              </div>
              <div className="stat-block">
                <span className="stat-icon">💨</span>
                <div className="stat-info">
                  <span className="stat-label">Viento</span>
                  <span className="stat-value">
                    {Math.round(actual.wind_speed_10m)}
                    <span className="stat-unit"> km/h</span>
                  </span>
                </div>
              </div>
              <div className="stat-block">
                <span className="stat-icon">🌧️</span>
                <div className="stat-info">
                  <span className="stat-label">Precipitación</span>
                  <span className="stat-value">
                    {actual.precipitation.toFixed(1)}
                    <span className="stat-unit"> mm</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <section className="detail-forecast fade-in fade-in-delay-2">
            <h2 className="detail-forecast-title">
              <span className="detail-forecast-title-line" />
              Pronóstico 7 días
            </h2>
            <div className="detail-forecast-grid">
              {diario.time.map((fecha, i) => (
                <TarjetaPronostico
                  key={fecha}
                  fecha={fecha}
                  codigoClima={diario.weather_code[i]}
                  tempMax={diario.temperature_2m_max[i]}
                  tempMin={diario.temperature_2m_min[i]}
                  precipitacion={diario.precipitation_sum[i]}
                  indice={i}
                />
              ))}
            </div>
          </section>

          <p className="detail-source">
            Datos provistos por{' '}
            <a href="https://open-meteo.com" target="_blank" rel="noreferrer">
              Open-Meteo
            </a>
          </p>
        </>
      )}
    </div>
  )
}

export default PaginaDetalleClima
