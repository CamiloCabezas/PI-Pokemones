import {
    CLEAN_STATE,
    GET_ALL_POKEMONS,
    GET_BY_NAME,
    ORDER_POKEMONS,
    TYPES_POKEMONS,
    POKEMONS_ORIGIN
  } from "../action-types/action-types";
  
  const initialState = {
    allPokemons: [],
    filteredPokemons: [], // Agrega un nuevo estado para los Pokémon filtrados
    pokemon: {},
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_POKEMONS:
        return {
          ...state,
          allPokemons: action.payload,
          filteredPokemons: action.payload, // Inicializa los Pokémon filtrados con todos los Pokémon
        };
      case GET_BY_NAME:
        return {
          ...state,
          pokemon: action.payload,
        };
      case CLEAN_STATE:
        return {
          allPokemons: [],
          filteredPokemons: [], // Limpia también los Pokémon filtrados
          pokemon: {},
        };
      case ORDER_POKEMONS:
        const allCharatersCopy = [...state.filteredPokemons]; // Cambia a filteredPokemons
        return {
          ...state,
          filteredPokemons:
            action.payload === "A"
              ? allCharatersCopy.sort((a, b) => a.attack - b.attack)
              : allCharatersCopy.sort((a, b) => b.attack - a.attack),
        };
      case TYPES_POKEMONS:
        if (action.payload === "all") {
          return {
            ...state,
            filteredPokemons: state.allPokemons, // Mostrar todos los Pokémon
          };
        } else {
          const typePokemons = state.allPokemons.filter(
            (pokemon) => pokemon.types.includes(action.payload)
          );
          return {
            ...state,
            filteredPokemons: typePokemons, // Mostrar solo los Pokémon del tipo seleccionado
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

      default:
        return state;
    }
  };
  
  export default reducer;
  