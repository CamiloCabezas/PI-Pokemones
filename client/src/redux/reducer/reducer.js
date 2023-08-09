import { CLEAN_STATE, GET_ALL_POKEMONS, GET_BY_NAME  } from "../action-types/action-types";

const initialState = {
    allPokemons : [],
    pokemon : {},
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case GET_ALL_POKEMONS:
            return{
                ...state,
                allPokemons: action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                pokemon: action.payload
            }
        case CLEAN_STATE:
            return{
                ...state,
                allPokemons: [],
                pokemon : {} 
            }

        default:
            return{
                ...state
            }
    }
}

export default reducer;