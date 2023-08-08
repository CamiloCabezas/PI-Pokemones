import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardPokemons.module.css"; // Importar los módulos de estilos

const CardPokemons = ({ id, name, image, types }) => {
  return (
      <div className={styles.tarjeta}>
        <div className={styles.pokemonImage}>
          <img
              src={image}
              alt={`Imagen de ${name}`}
            />
        </div>
        <div className={styles.linea}></div>
        <div className={styles.circulo}></div>
        <div>
        <p className={styles.pokemonName}>
          <Link to={`/detail/${id}`}>{name}</Link>
        </p>
        <p className={styles.pokemonTypes}>
          <strong>Types:</strong> {types}
        </p>
        </div>
      </div>
  );
};

export default CardPokemons;

