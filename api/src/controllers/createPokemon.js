const axios = require('axios');
const { Pokemon } = require('../db');


const createPokemon = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

       

        if(!name || !image || !hp || !attack || !defense){
            return res.status(400).send('Para crear el pokemon aun hace falta datos')
        }

        const newPokemon = await Pokemon.create({
            name: name,
            image: image,
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight,
            types: types,
        });

        return res.status(200).json(newPokemon)
    } catch (error) {
        return res.status(400).send(error.message)
    }


}

module.exports = {
    createPokemon,
}