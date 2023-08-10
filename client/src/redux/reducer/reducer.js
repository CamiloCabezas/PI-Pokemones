import { CLEAN_STATE, GET_ALL_POKEMONS, GET_BY_NAME, ORDER_POKEMONS, TYPES_POKEMONS  } from "../action-types/action-types";

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
                allPokemons: [],
                pokemon : {} 
            }

        case ORDER_POKEMONS:
            const allCharatersCopy = [ ...state.allPokemons]
            return{
                ...state,
                allPokemons:
                    action.payload === "A"
                    ? allCharatersCopy.sort((a,b) => a.id - b.id)
                    : allCharatersCopy.sort ((a,b) => b.id - a.id)
            }
        
        case TYPES_POKEMONS:
            const typePokemons = state.allPokemons.filter(
                pokemon => pokemon.types === action.payload
            )
            return{
                ...state,
                allPokemons : typePokemons
            }

        default:
            return{
                ...state
            }
    }
}

export default reducer;