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

    // Obtener o crear los objetos de tipo (types) en la base de datos
    const typesArray = types.split(',').map((type) => type.trim());
    const typeObjects = await Promise.all(typesArray.map((typeName) => Type.findOrCreate({ where: { name: typeName } })));
    const typesInDb = typeObjects.map((typeObject) => typeObject[0]);
    
    // Crear el nuevo Pokémon en la base de datos
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
    
    // Asociar los tipos al nuevo Pokémon
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
