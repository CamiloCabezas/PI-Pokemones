import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './detail.module.css'
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
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={image} alt={`Imagen de ${name}`} />
        </div>
        <div className={styles.leftSide}>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.stats}>
            <div>
              <h5 className={styles.label}><strong>HP:</strong></h5>
              <p>{hp}</p>
            </div>
            <div>
              <h5 className={styles.label}><strong>Attack:</strong></h5>
              <p>{attack}</p>
            </div>
            <div>
              <h5 className={styles.label}><strong>Defense:</strong></h5>
              <p>{defense}</p>
            </div>
            <div>
              <h5 className={styles.label}><strong>Speed:</strong></h5>
              <p>{speed}</p>
            </div>
          </div>
          <div className={styles.additionalInfo}>
            <div>
              <h5 className={styles.label}><strong>Height:</strong></h5>
              <p>{height}</p>
            </div>
            <div>
              <h5 className={styles.label}><strong>Weight:</strong></h5>
              <p>{weight}</p>
            </div>
          </div>
          <div className={styles.types}>
            <h5 className={styles.label}><strong>Types:</strong></h5>
            <p>{types}</p>
          </div>
        </div>
      </div>
    );
  };
  
  
export default Detail;
  
