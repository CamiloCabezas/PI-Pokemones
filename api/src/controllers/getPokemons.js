const axios = require('axios');
const { Pokemon, Type } = require('../db');

const URL = 'https://pokeapi.co/api/v2/pokemon/';

const getPokemons = async (req, res) => {
    try {
        const { data } = await axios.get(`${URL}?limit=60`);
        const { results } = data;

        const pokemonsDetails = await Promise.all(results.map(async (pok) => {
            const { data } = await axios.get(pok.url);

            const { id, name, sprites, stats, weight, height, types } = data;
            // const id = parseInt(pok.url.split('/').slice(-2, -1)[0]);

            if (name) {
                const pokemon = {
                    id,
                    name,
                    image: sprites.other.dream_world.front_default,
                    hp: stats[0].base_stat,
                    attack: stats[1].base_stat,
                    defense: stats[2].base_stat,
                    speed: stats[5] ? stats[5].base_stat : null,
                    height: height ? height : null,
                    weight: weight ? weight : null,
                    types: types.map(typ => typ.type.name).join(',')
                };
                return pokemon;
            }

            if (!name) throw Error(`Algo salio mal`);
        }));

        const DbPokemons = await Pokemon.findAll({
            include: Type
        });


        const pokemonDB = DbPokemons.map((pokemon) =>{
            const types = pokemon.Types.map((type) => type.name)
            return { 
                id: pokemon.id,
                name : pokemon.name,
                image : pokemon.image,
                hp: pokemon.hp,
                attack : pokemon.attack,
                defense : pokemon.defense,
                speed : pokemon.speed,
                height : pokemon.height,
                weight : pokemon.weight,
                types : types.join(',')
            }
        })
        
     

        const allPokemons = [...pokemonsDetails,...pokemonDB]

        
        return res.status(200).json(allPokemons);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};


module.exports = {
    getPokemons,
}