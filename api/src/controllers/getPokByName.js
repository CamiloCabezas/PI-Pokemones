const axios = require('axios');


const URL = 'https://pokeapi.co/api/v2/pokemon/';

const getPokByName = async (req, res) => {
    try {
        const { nombre } = req.query;

        const lowerName = nombre.toLowerCase()
        const { data } = await axios.get(`${URL}/${lowerName}`)

        if(!data){
            return res.status(404).send(`El pokemon con el nombre ${nombre} no existe`)
        }

        const { id, name, sprites, stats, weight, height } = data

        if (id && name) {
            const pokemon = {
                id,
                name,
                image: sprites.front_default,
                hp: stats[0].base_stat,
                attack: stats[1].base_stat,
                defense: stats[2].base_stat,
                speed: stats[5] ? stats[5].base_stat : null,
                height: height ? height : null,
                weight: weight ? weight : null,
            };
            return res.status(200).json(pokemon)
        }
    } catch (error) {
        return res.status(500).send('Hubo un error al procesar la solicitud')
    }
};




module.exports = {
    getPokByName,
}