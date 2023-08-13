import './App.css';

import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/landing/landing';
import CardsPokemons from './components/home/home';
import Detail from './components/Detail/detail';
import Nav from './components/Nav/nav';
import CreatePokemon from './components/CreatePokemon/createPokemon';

function App() {


  const location = useLocation();




  return (
    <div className="App">
      {(location.pathname !== "/" ) && <Nav/>}
      <Routes> 
        <Route path='/' element={<LandingPage/>} /> 
        <Route path='/home' element={<CardsPokemons/>} />
        <Route path='/detail/:idPokemon' element={<Detail/>}/>
        <Route path='/create' element={<CreatePokemon/>}/>
      </Routes>
    </div>
  );
}
export default App;

