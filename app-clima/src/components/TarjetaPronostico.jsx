import { obtenerInfoClima, formatearDia, formatearFecha, obtenerColorGrupo } from '../utils/utilidadesClima'

function TarjetaPronostico({ fecha, codigoClima, tempMax, tempMin, precipitacion, indice = 0 }) {
  const info = obtenerInfoClima(codigoClima)
  const colorAcento = obtenerColorGrupo(codigoClima)
  const esHoy = indice === 0

  return (
    <div
      className={`forecast-card fade-in-delay-${Math.min(indice + 1, 3)}`}
      style={{ '--card-accent': colorAcento }}
    >
      <div className="forecast-day">
        <span className="forecast-day-name">{esHoy ? 'Hoy' : formatearDia(fecha)}</span>
        <span className="forecast-date">{formatearFecha(fecha)}</span>
      </div>
      <div className="forecast-icon-wrap">
        <span className="forecast-icon">{info.icono}</span>
      </div>
      <p className="forecast-label">{info.etiqueta}</p>
      <div className="forecast-temps">
        <span className="forecast-temp-max">{Math.round(tempMax)}°</span>
        <span className="forecast-temp-divider">/</span>
        <span className="forecast-temp-min">{Math.round(tempMin)}°</span>
      </div>
      {precipitacion > 0 && (
        <div className="forecast-precip">
          <span className="forecast-precip-icon">💧</span>
          <span className="forecast-precip-val">{precipitacion.toFixed(1)} mm</span>
        </div>
      )}
    </div>
  )
}

export default TarjetaPronostico
