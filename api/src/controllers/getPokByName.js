const axios = require('axios');
const { Pokemon, Type } = require('../db');

const URL = 'https://pokeapi.co/api/v2/pokemon/';

const getPokByName = async (req, res) => {
    try {
        const { nombre } = req.query;

        const pokemon = await Pokemon.findOne({
            where: {
                name: nombre,
            },
            include: {
                model: Type,
                through: 'pokemon_type',
            },
        });

        if (pokemon) {
            return res.status(200).json(pokemon);
        }

        const lowerName = nombre.toLowerCase();
        const { data } = await axios.get(`${URL}/${lowerName}`);

        if (!data) {
            return res.status(404).send(`El pokemon con el nombre ${nombre} no existe`);
        }

        const { id, name, sprites, stats, weight, height, types } = data;

        if (id && name) {
            const pokemon = {
                id,
                name,
                image:  sprites.other.dream_world.front_default,
                hp: stats[0].base_stat,
                attack: stats[1].base_stat,
                defense: stats[2].base_stat,
                speed: stats[5] ? stats[5].base_stat : null,
                height: height ? height : null,
                weight: weight ? weight : null,
                types: types.map((typ) => typ.type.name).join(','),
            };
            return res.status(200).json(pokemon);
        }
    } catch (error) {
        return res.status(500).send(`El pokemon con ese nombre no existe`);
    }
};





module.exports = {
    getPokByName,
}