import axios from 'axios';
import { GET_ALL_POKEMONS, GET_BY_NAME, CLEAN_STATE, ORDER_POKEMONS, TYPES_POKEMONS, POKEMONS_ORIGIN} from '../action-types/action-types';

export const getAllPokemons = () => {
    return async function(dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/pokemons');
            dispatch({
                type: GET_ALL_POKEMONS,
                payload: response.data
            });
        } catch (error) {
            // En lugar de simplemente devolver el error, puedes lanzar una acción para manejarlo
            dispatch({
                type: 'FETCH_POKEMONS_ERROR',
                payload: error.message  // O cualquier otra información útil del error
            });
        }
    }
}


export const getPokeByName = (nombre) => {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/pokemons?nombre=${nombre}`)
            dispatch({
                type: GET_BY_NAME,
                payload: response.data
            })   
        } catch (error) {
            dispatch({
                type: 'FETCH_POKEMONS_ERROR',
                payload: error.message
            })
        }
    }
}


export const claenState = () => {
    return ({
        type: CLEAN_STATE,
        payload: {}
    })
}

export const orderPokemons = (order) => {
    return{
        type : ORDER_POKEMONS,
        payload : order
    }
}

export const typesPokemons = (type) => {
    return{
        type: TYPES_POKEMONS,
        payload: type
    }
}

export const getPokemonsByOrigin = (origin) => {
    return {
        type : POKEMONS_ORIGIN,
        payload : origin
    }
}