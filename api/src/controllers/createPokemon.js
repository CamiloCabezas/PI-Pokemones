const { Pokemon, Type } = require('../db');

const createPokemon = async (req, res) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

    const validate = await Pokemon.findOne({
        where: {
            name,
        }
    });

    if (validate) {
      throw new Error('El personaje ya existe');
    }

    const typesArray = Array.isArray(types) ? types : types.split(',').map((type) => type.trim());
    const typeObjects = await Promise.all(typesArray.map((typeName) => Type.findOrCreate({ where: { name: typeName } })));//dos elementos
    const typesInDb = typeObjects.map((typeObject) => typeObject[0]);//me quedo con el nombre y descarto el booleano

    const newPokemon = await Pokemon.create({
        name,
        image, 
        hp, 
        attack, 
        defense, 
        speed, 
        height, 
        weight
    });

    if (typesInDb.length > 0) {
      await newPokemon.setTypes(typesInDb);
    }

    return res.status(200).json(newPokemon);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPokemon,
};
