
function MensajeError({ mensaje = 'Ocurrió un error inesperado.', alReintentar }) {
  return (
    <div className="error-wrapper fade-in">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Algo salió mal</h3>
      <p className="error-text">{mensaje}</p>
      {alReintentar && (
        <button className="error-retry-btn" onClick={alReintentar}>
          Reintentar
        </button>
      )}
    </div>
  )
}

export default MensajeError
