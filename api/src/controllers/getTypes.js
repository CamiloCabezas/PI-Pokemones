const axios =  require('axios');
const { Type } = require('../db');

const URL = 'https://pokeapi.co/api/v2/type'

const getTypes = async (req, res) => {
    const { data } = await axios.get(`${URL}`);

    const { results } = data;
    const types = results.map((type) => type.name);

    types.forEach(async (type) => {
        const newType = await Type.create({
            name : type,
        })
        return newType
    })

    return res.status(200).json(types)
}

module.exports = {
    getTypes
}