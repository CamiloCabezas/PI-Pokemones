import './App.css';

import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/landing/landing';
import CardsPokemons from './components/home/home';
import Detail from './components/Detail/detail';
import Nav from './components/Nav/nav';
import CreatePokemon from './components/CreatePokemon/createPokemon';
import { useDispatch } from 'react-redux';
import  {getAllPokemons}  from "./redux/actions/actions";

function App() {

  const dispatch = useDispatch();
  const location = useLocation();

  const onstart = async () => {
    dispatch(getAllPokemons())
}


  return (
    <div className="App">
      {(location.pathname !== "/" ) && <Nav/>}
      <Routes> 
        <Route path='/' element={<LandingPage onstart={onstart}/>} /> 
        <Route path='/home' element={<CardsPokemons onstart={onstart}/>} />
        <Route path='/detail/:idPokemon' element={<Detail/>}/>
        <Route path='/create' element={<CreatePokemon/>}/>
      </Routes>
    </div>
  );
}
export default App;

