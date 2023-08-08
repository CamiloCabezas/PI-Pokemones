import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ onSearch, tohome }) => {
    const [nombre, setNombre] = useState('');
  
    const handleChange = (event) => {
      setNombre(event.target.value);
    };
  
    return (
      <div>
        <h1>Pokemon's Page</h1>
        <input type="search" value={nombre} onChange={handleChange} placeholder="Nombre del Pokemon" />
        <Link onClick={() => { onSearch(nombre); setNombre(''); }} to={'/home'}>Search</Link>
        <br />
        <Link
        onClick={() => { tohome(); }} to={'/home'}>
            Home
        </Link>
      </div>
    );
  };
  
  export default SearchBar;
  