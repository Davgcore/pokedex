
import { Route, Routes } from 'react-router-dom'
import './App.css'
// COMPONENTES
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import ProtectedRoutes from './pages/ProtectedRoutes' // proteger ruta pokedex
import PokedexName from './pages/PokedexName'


function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/pokedex' element={<Pokedex/>} />
          <Route path='pokedex/:name' element={<PokedexName/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
