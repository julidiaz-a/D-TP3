
function CargandoSpinner({ mensaje = 'Cargando...' }) {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-ring">
        <div className="spinner-inner" />
      </div>
      <p className="spinner-message">{mensaje}</p>
    </div>
  )
}

export default CargandoSpinner
