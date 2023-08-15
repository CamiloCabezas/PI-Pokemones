import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import  {getAllPokemons, orderPokemons, typesPokemons, getPokemonsByOrigin, claenState, getPokemonByAlpha}  from "../../redux/actions/actions";
import CardPokemons from "../Card/card";
import styles from './Home.module.css';
import axios from 'axios'
import Paginacion from '../Paginacion/paginacion'

const CardsPokemons = ({onstart}) => {
    const [ types, setTypes ] = useState([])

    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.filteredPokemons)
    const pokemon = useSelector(state => state.pokemon)

    //Paginacion

    const [ page, setPage ] = useState(1);
    const [ perPage, setPerPage ] = useState(12);

    const max = Math.ceil(pokemons.length / perPage)
  

    const getTypes = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/types')
            setTypes([...data])
        } catch (error) {
            window.alert('Hay un error con los tipos')
        }
        
    }

    useEffect(() => {
        onstart()
        dispatch(getAllPokemons());
        // dispatch(getPokeByName()) ;
        getTypes();
    }, [])

    const rederedData =  pokemon.id ? [pokemon] : pokemons
    console.log(rederedData);

    const handlerOrder = (event) => {
        dispatch(orderPokemons(event.target.value));
    }

    const handlerType = (event) => {
        dispatch(typesPokemons(event.target.value));
    }

    const handlerAlphaOrder = (event) => {
        dispatch(getPokemonByAlpha(event.target.value))
    }

    const handlerOrigin = (event) => {
        dispatch(claenState)
        dispatch(getPokemonsByOrigin(event.target.value));
    }

    return (
        <div>
            <div>
            <select onChange={handlerOrder}>
                <option value="A">Up Attack</option>
                <option value="D">Down Attack</option>
            </select>

            <select onChange={handlerAlphaOrder}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>

            <select onChange={handlerType}>
                <option value="all">All</option>
            {
                types.map((type, index) => (
                    <option key={index}value={type}>{type}</option>
                ))
            }
                        
            </select>

            <select onChange={handlerOrigin}>
                <option value="api">Api</option>
                <option value="data_base">Data Base</option>
            </select>
            </div>

        <div className={styles.pokemonGrid}>
            

            {
            rederedData
            .slice(
                (page - 1) * perPage,
                (page - 1) * perPage + perPage
                )
            .map((data, index) => (
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
            {
                rederedData.length !== 1
                    ? <div>
                        <Paginacion page={page} setPage={setPage} max={max}/>
                     </div>
                     : null
            }
        </div>
    );


}

export default CardsPokemons;

