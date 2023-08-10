import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import  {getAllPokemons, orderPokemons, typesPokemons}  from "../../redux/actions/actions";
import CardPokemons from "../Card/card";
import styles from './Home.module.css';
import axios from 'axios'

const CardsPokemons = () => {
    const [ types, setTypes ] = useState([])

    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.allPokemons)
    const pokemon = useSelector(state => state.pokemon)

    const getTypes = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/types')
            setTypes([...data])
        } catch (error) {
            window.alert('Hay un error con los tipos')
        }
        
    }

    useEffect(() => {
        dispatch(getAllPokemons());
        // dispatch(getPokeByName()) ;
        getTypes();
    }, [dispatch])

    const rederedData =  pokemon.id ? [pokemon] : pokemons

    const handlerOrder = (event) => {
        dispatch(orderPokemons(event.target.value))
    }

    const handlerType = (event) => {
        dispatch(typesPokemons(event.target.value))
    }

    return (
        <div>
            <div>
            <select onChange={handlerOrder}>
                <option value="A">Ascendente</option>
                <option value="D">Descendente</option>
            </select>

            <select onChange={handlerType}>
            {
                types.map((type, index) => (
                    <option key={index}value={type}>{type}</option>
                ))
            }
                        
            </select>
            </div>

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

        </div>
    );


}

export default CardsPokemons;

