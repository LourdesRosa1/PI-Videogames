const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogame=require('./Videogames.js')


const router = Router();

// Configurar los routers
router.use('/', videogame)


module.exports = router;
