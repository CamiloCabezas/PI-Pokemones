const axios = require('axios');

const URL = 'https://pokeapi.co/api/v2/pokemon/';

const getPokById = async (req, res) => {
    try {
        const { idPokemon } = req.params;

        const { data } = await axios.get(`${URL}/${idPokemon}`)

        const { name, sprites, stats, weight, height, types } = data;

        const arrayTypes = types.map(typ => {
            return typ.type.name;
        }).join(',')


        if(name){
            const pokFound = {
                idPokemon,
                name,
                image: sprites.front_default,
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