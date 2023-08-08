import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';


const Detail = () => {
    const { idPokemon } = useParams();
    const [characterDetail, setCharacter] = useState({});
  
    useEffect(() => {
      const getpokemonById = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3001/pokemons/${idPokemon}`);
          if (data.name) {
            setCharacter(data);
          } else {
            setCharacter({});
          }
        } catch (error) {
          setCharacter({});
          console.error('Error: no hay detalles del personaje', error);
        }
      };

      getpokemonById();
    }, [idPokemon]);

    const { name, image, hp, attack, defense, speed, height, weight, types } = characterDetail;

    return (
      <div>
        {/* <Link to={'/home'}>Home</Link> */}
        <h2>{name}</h2>
        <img src={image} alt={`Imagen de ${name}`} />
        <p><strong>HP:</strong></p>
        <p>{hp}</p>
        <p><strong>Attack:</strong></p>
        <p>{attack}</p>
        <p><strong>Defense:</strong></p>
        <p>{defense}</p>
        <p><strong>Speed:</strong></p>
        <p>{speed}</p>
        <p><strong>Height:</strong></p>
        <p>{height}</p>
        <p><strong>Weight:</strong></p>
        <p>{weight}</p>
        <p><strong>Types:</strong></p>
        <p>{types}</p>
      </div>
    );
  };
  
export default Detail;
  
