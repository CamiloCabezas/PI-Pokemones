import React from "react";
import CardPokemons from "../Card/card";
import styles from './Home.module.css';

const CardsPokemons = ({ characters }) => {
    return (
        <div className={styles.pokemonGrid}>
            {characters.map((character, index) => (
                <div key={index} className={styles.cardContainer}>
                    <CardPokemons
                        id={character.id}
                        name={character.name}
                        image={character.image}
                        types={character.types}
                    />
                </div>
            ))}
        </div>
    );
}

export default CardsPokemons;

