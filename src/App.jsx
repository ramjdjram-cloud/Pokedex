import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Detail from './pages/Detail.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Detail />} />
          <Route path="/favoritos" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
