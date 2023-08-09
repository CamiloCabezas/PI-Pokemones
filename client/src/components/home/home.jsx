import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import  {getAllPokemons, getPokeByName}  from "../../redux/actions/actions";
import CardPokemons from "../Card/card";
import styles from './Home.module.css';

const CardsPokemons = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.allPokemons)
    const pokemon = useSelector(state => state.pokemon)

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getPokeByName()) ;
    }, [dispatch])

    const rederedData =  pokemon.id ? [pokemon] : pokemons
    return (
        <div className={styles.pokemonGrid}>
            
            {
            rederedData.map((data, index) => (
                <div key={index} className={styles.cardContainer}>
                    <CardPokemons
                        id={data.id}
                        name={data.name}
                        image={data.image}
                        types={data.types}
                    />
                </div>
            ))}
        </div>
    );


}

export default CardsPokemons;

