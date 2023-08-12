const axios = require('axios');
const{ Pokemon, Type} = require('../db')


const URL = 'https://pokeapi.co/api/v2/pokemon/';

const getPokById = async (req, res) => {
    try {
        const { idPokemon } = req.params;

        if(idPokemon.length > 3) {
                // Intentar buscar el Pokémon en la base de datos por su ID
        const pokemon = await Pokemon.findByPk(idPokemon, {
            include: Type
        });



        const pokemonDB = {
            id: pokemon.id,
            name : pokemon.name,
            image : pokemon.image,
            hp: pokemon.hp,
            attack : pokemon.attack,
            defense : pokemon.defense,
            speed : pokemon.speed,
            height : pokemon.height,
            weight : pokemon.weight,
            types : pokemon.Types.map((type) => type.name).join(',')
        }
        console.log(pokemon.Types.map((type) => type.name))
    
        if (pokemonDB) {
            // Si se encuentra el Pokémon en la base de datos, enviarlo como respuesta
            return res.status(200).json(pokemonDB);
        }
        }
  

        const { data } = await axios.get(`${URL}/${idPokemon}`)

        const { name, sprites, stats, weight, height, types } = data;

        const arrayTypes = types.map(typ => {
            return typ.type.name;
        }).join(',')


        if(name){
            const pokFound = {
                idPokemon,
                name,
                image:  sprites.other.dream_world.front_default,
                hp: stats[0].base_stat,
                attack: stats[1].base_stat,
                defense: stats[2].base_stat,
                speed: stats[5] ? stats[5].base_stat : null,
                height: height ? height : null,
                weight: weight ? weight : null,
                types: arrayTypes
            }

            return res.status(200).json(pokFound)
        }

        if(!name) throw Error('No hay datos suficientes');
        
    } catch (error) {
        res.status(400).send(error.message)
    }
};

module.exports = {
    getPokById,
}