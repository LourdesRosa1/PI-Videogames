const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogame=require('./Videogames.js')
const genres=require('./Genres.js')


const router = Router();

// Configurar los routers
router.use('/', videogame)
router.use('/', genres)


module.exports = router;
