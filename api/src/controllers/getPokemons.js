const axios = require('axios');
const { Pokemon } = require('../db');

const URL = 'https://pokeapi.co/api/v2/pokemon/';

const getPokemons = async (req, res) => {
    try {
        const { data } = await axios.get(`${URL}?limit=80`);
        const { results } = data;

        const pokemonsDetails = await Promise.all(results.map(async (pok) => {
            const { data } = await axios.get(pok.url);

            const { name, sprites, stats, weight, height, types } = data;
            const idPokemon = parseInt(pok.url.split('/').slice(-2, -1)[0]);

            if (name) {
                const pokemon = {
                    idPokemon,
                    name,
                    image: sprites.front_default,
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

        const DbPokemons = await Pokemon.findAll()

        const allPokemons = [...pokemonsDetails,...DbPokemons]

        console.log(DbPokemons)
        return res.status(200).json(allPokemons);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};


module.exports = {
    getPokemons,
}