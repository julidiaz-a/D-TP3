import axios from 'axios'

// Endpoint 1: Nominatim — búsqueda de ciudades
const clienteNominatim = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  headers: {
    'Accept-Language': 'es',
  },
})

// Endpoint 2: Open-Meteo — pronóstico del clima
const clienteMeteo = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
})

/**
 * Busca ciudades por nombre usando la API de Nominatim
 * @param {string} ciudad - nombre de la ciudad
 */
export const buscarCiudades = async (ciudad) => {
  const respuesta = await clienteNominatim.get('/search', {
    params: {
      q: ciudad,
      format: 'json',
      addressdetails: 1,
      limit: 10,
    },
  })
  return respuesta.data
}

/**
 * Obtiene el clima actual y pronóstico de 7 días usando la API de Open-Meteo
 * @param {number} lat - latitud
 * @param {number} lon - longitud
 */
export const obtenerPronosticoClima = async (lat, lon) => {
  const respuesta = await clienteMeteo.get('/forecast', {
    params: {
      latitude: lat,
      longitude: lon,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'weather_code',
        'wind_speed_10m',
        'precipitation',
        'is_day',
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
        'wind_speed_10m_max',
      ].join(','),
      forecast_days: 7,
      timezone: 'auto',
    },
  })
  return respuesta.data
}
