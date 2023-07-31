const { getPokemons } = require('../controllers/getPokemons');
const { getPokById } = require('../controllers/getPokById');
const { getPokByName } = require('../controllers/getPokByName');
const express = require('express');
const router = express.Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.get('/pokemons',(req, res ) => {
    const { nombre } = req.query
    if(!nombre) getPokemons(req, res)
    getPokByName(req, res);
})

router.get('/pokemons/:idPokemon', (req, res) => {
    getPokById(req, res);
})



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
