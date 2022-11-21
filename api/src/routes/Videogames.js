const {allVideoInfo} =require('../controller/getVideogames.js')
const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');

const router = Router();

router.get('/videogames', async (req,res) => {
    try{
        const {name}=req.query
        const resultsDb= await allVideoInfo()
        if(name){
        const videoByName= resultsDb?.filter(
            (e) => e.name.toLowerCase().startsWith(name.toLowerCase())
        );
        videoByName.length > 0 ? res.status(200).json(videoByName) : res.send('error')
        } else {
            res.status(200).json(resultsDb)
        }
    } catch (error) {
        res.status(500).send('Videogame not found')
    }

})

module.exports = router;