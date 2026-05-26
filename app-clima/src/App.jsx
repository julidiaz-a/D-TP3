import { Routes, Route } from 'react-router-dom'
import BarraNavegacion from './components/BarraNavegacion'
import PaginaBusqueda from './pages/PaginaBusqueda'
import PaginaResultados from './pages/PaginaResultados'
import PaginaDetalleClima from './pages/PaginaDetalleClima'
import './App.css'

function App() {
  return (
    <div className="app-wrapper">
      <BarraNavegacion />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PaginaBusqueda />} />
          <Route path="/resultados" element={<PaginaResultados />} />
          <Route path="/clima/:lat/:lon/:nombre" element={<PaginaDetalleClima />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
