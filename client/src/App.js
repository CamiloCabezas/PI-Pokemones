import './App.css';

import axios from "axios"
import { Routes, Route } from 'react-router-dom'; 
import { useState, useEffect } from "react"
import LandingPage from './components/landing/landing';
import CardsPokemons from './components/home/home';

function App() {
  const [ characters, setCharacters ] = useState([])

  useEffect(() => {
    getAllPokemons()
  },[])

  const getAllPokemons = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/pokemons')
      setCharacters([...data])
    } catch (error) {
      alert('Hay un error con el llamado')
    }
  }

  return (
    <div className="App">
      <Routes> 
        <Route path='/' element={<LandingPage/>} /> 
        <Route path='/home' element={<CardsPokemons characters={characters} />} /> 
      </Routes>
    </div>
  );
}

export default App;

