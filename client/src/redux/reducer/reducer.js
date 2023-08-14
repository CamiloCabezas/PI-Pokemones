import {
    CLEAN_STATE,
    GET_ALL_POKEMONS,
    GET_BY_NAME,
    ORDER_POKEMONS,
    TYPES_POKEMONS,
    POKEMONS_ORIGIN,
    POKEMONS_ALPHA
  } from "../action-types/action-types";


  
  const initialState = {
    allPokemons: [],
    filteredPokemons: [], 
    pokemon: {},
  };
  
  

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_POKEMONS:
        return {
          ...state,
          allPokemons: action.payload,
          filteredPokemons: action.payload,
        };
      case GET_BY_NAME:
        return {
          ...state,
          pokemon: action.payload,
        };
      case CLEAN_STATE:
        return {
          allPokemons: [],
          filteredPokemons: [], 
          pokemon: {},
        };
      case ORDER_POKEMONS:
        const allCharatersCopy = [...state.filteredPokemons]; 
        return {
          ...state,
          filteredPokemons:
            action.payload === "A"
              ? allCharatersCopy.sort((a, b) => b.attack - a.attack)
              : allCharatersCopy.sort((a, b) => a.attack - b.attack),
              
        };
      case TYPES_POKEMONS:
        if (action.payload === "all") {
          return {
            ...state,
            filteredPokemons: state.allPokemons, 
          };
        } else {
          const typePokemons = state.allPokemons.filter(
            (pokemon) => pokemon.types.includes(action.payload)
          );
          return {
            ...state,
            filteredPokemons: typePokemons, 
          };
        }
      case POKEMONS_ORIGIN:
            if (action.payload === 'api') {
              const apiOriginPokemon = state.allPokemons.filter((pokemon) => typeof pokemon.id === 'number');
              return {
                ...state,
                filteredPokemons: apiOriginPokemon,
              };
            } else if(action.payload === 'data_base') {
              const otherOriginPokemon = state.allPokemons.filter((pokemon) => typeof pokemon.id === 'string')
              return {
                ...state,
                filteredPokemons: otherOriginPokemon,
              };
            }

        case POKEMONS_ALPHA:
        
            const allCopy = [...state.filteredPokemons]; 
            return {
              ...state,
              filteredPokemons:
                action.payload === "A-Z"
                ? allCopy.sort((a, b) => a.name.localeCompare(b.name))
                : allCopy.sort((a, b) => b.name.localeCompare(a.name)),
  };
        
        case 'POKEMONS_ERROR':
          window.alert(action.payload)
          return {
            ...state,
          }

      default:
       { return state;}
    }
  };
  
  export default reducer;
  