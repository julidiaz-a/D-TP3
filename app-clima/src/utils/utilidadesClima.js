/**
 * Códigos WMO de clima → descripción e ícono emoji
 * https://open-meteo.com/en/docs#weathervariables
 */
export const CODIGOS_WMO = {
  0:  { etiqueta: 'Despejado',            icono: '☀️',  grupo: 'despejado' },
  1:  { etiqueta: 'Mayormente despejado', icono: '🌤️', grupo: 'pocas-nubes' },
  2:  { etiqueta: 'Parcialmente nublado', icono: '⛅',  grupo: 'pocas-nubes' },
  3:  { etiqueta: 'Nublado',              icono: '☁️',  grupo: 'nublado' },
  45: { etiqueta: 'Niebla',               icono: '🌫️', grupo: 'niebla' },
  48: { etiqueta: 'Niebla con escarcha',  icono: '🌫️', grupo: 'niebla' },
  51: { etiqueta: 'Llovizna ligera',      icono: '🌦️', grupo: 'llovizna' },
  53: { etiqueta: 'Llovizna moderada',    icono: '🌦️', grupo: 'llovizna' },
  55: { etiqueta: 'Llovizna intensa',     icono: '🌧️', grupo: 'lluvia' },
  61: { etiqueta: 'Lluvia ligera',        icono: '🌧️', grupo: 'lluvia' },
  63: { etiqueta: 'Lluvia moderada',      icono: '🌧️', grupo: 'lluvia' },
  65: { etiqueta: 'Lluvia intensa',       icono: '🌧️', grupo: 'lluvia-fuerte' },
  71: { etiqueta: 'Nevada ligera',        icono: '🌨️', grupo: 'nieve' },
  73: { etiqueta: 'Nevada moderada',      icono: '❄️',  grupo: 'nieve' },
  75: { etiqueta: 'Nevada intensa',       icono: '❄️',  grupo: 'nieve' },
  77: { etiqueta: 'Granos de nieve',      icono: '🌨️', grupo: 'nieve' },
  80: { etiqueta: 'Chubascos ligeros',    icono: '🌦️', grupo: 'lluvia' },
  81: { etiqueta: 'Chubascos moderados',  icono: '🌧️', grupo: 'lluvia' },
  82: { etiqueta: 'Chubascos violentos',  icono: '⛈️',  grupo: 'lluvia-fuerte' },
  85: { etiqueta: 'Chubascos de nieve',   icono: '🌨️', grupo: 'nieve' },
  86: { etiqueta: 'Chubascos de nieve',   icono: '🌨️', grupo: 'nieve' },
  95: { etiqueta: 'Tormenta',             icono: '⛈️',  grupo: 'tormenta' },
  96: { etiqueta: 'Tormenta con granizo', icono: '⛈️',  grupo: 'tormenta' },
  99: { etiqueta: 'Tormenta con granizo', icono: '⛈️',  grupo: 'tormenta' },
}

export const obtenerInfoClima = (codigo) => {
  return CODIGOS_WMO[codigo] ?? { etiqueta: 'Desconocido', icono: '🌡️', grupo: 'desconocido' }
}

/**
 * Color de acento según grupo de clima
 */
export const COLORES_GRUPO = {
  despejado:      '#fbbf24',
  'pocas-nubes':  '#94a3b8',
  nublado:        '#64748b',
  niebla:         '#78716c',
  llovizna:       '#60a5fa',
  lluvia:         '#3b82f6',
  'lluvia-fuerte':'#1d4ed8',
  nieve:          '#bae6fd',
  tormenta:       '#7c3aed',
  desconocido:    '#38bdf8',
}

export const obtenerColorGrupo = (codigo) => {
  const info = obtenerInfoClima(codigo)
  return COLORES_GRUPO[info.grupo] ?? '#38bdf8'
}

/**
 * Días de la semana en español abreviados
 */
const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export const formatearDia = (fechaStr) => {
  const d = new Date(fechaStr + 'T12:00:00')
  return DIAS[d.getDay()]
}

export const formatearFecha = (fechaStr) => {
  const d = new Date(fechaStr + 'T12:00:00')
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
}
