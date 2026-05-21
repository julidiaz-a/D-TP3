import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/BarraNavegacion.jsx'
import Inicio from '../components/Inicio.jsx'
import './App.css'

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
