import './App.css';

import axios from "axios"
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { useState, useEffect } from "react"
import LandingPage from './components/landing/landing';
import CardsPokemons from './components/home/home';
import Detail from './components/Detail/detail';
import Nav from './components/Nav/nav';

function App() {
  const [ characters, setCharacters ] = useState([]);
  const [ charactersByName, setCharactersByName] = useState([]);

  const location = useLocation();

  const getAllPokemons = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/pokemons')
      setCharacters([...data])
    } catch (error) {
      alert('Hay un error con el llamado')
    }
  }

  
  const onSearch = async (nombre) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/pokemons?nombre=${nombre}`);
      console.log('que esta pasando');
      if (data.name) setCharactersByName([data]);
      
    
    } catch (error) {
      window.alert('No Existe un pokemon con ese nombre');
    }
  };
  
  useEffect(() => {
    getAllPokemons()
    
    setCharacters([])
  },[])

  const tohome = async () => {
    try {
      setCharactersByName([]); 
    } catch (error) {
      alert('salio algo mal');
    }
  }


  return (
    <div className="App">
      {(location.pathname !== "/" ) && <Nav onSearch={onSearch} tohome={tohome}/>}
      <Routes> 
        <Route path='/' element={<LandingPage/>} /> 
        <Route path='/home' element={<CardsPokemons characters={charactersByName.length > 0 ? charactersByName : characters} />} /> 
        <Route path='/detail/:idPokemon' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;

