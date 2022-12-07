const {allVideoInfo} =require('../controller/getVideogames.js')
const {dbApiDetail}=require('../controller/getId')
const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');
const db = require('../db.js');

const router = Router();

router.get('/videogames', async (req,res) => {
    try{
        const {name}=req.query;
        const resultsDb= await allVideoInfo();
        //console.log('resultsDb: ',resultsDb);
        if(name){
        const videoByName= resultsDb?.filter((e) => e.name.toLowerCase().startsWith(name.toLowerCase()));
        videoByName.length > 0 ? res.status(200).json(videoByName.slice(0,15)) : res.send('error')
        } else {
            res.status(200).json(resultsDb)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/videogame/:id', async (req,res) => {
    try{
        const{id}=req.params;
        const videogameTodos= await dbApiDetail(id);
        videogameTodos.length? res.status(200).send(videogameTodos) : res.status(404).send('No existe Videogames')
    } catch(error) {
        res.status(400).json(error.message)
    }
})

router.post('/videogames', async (req,res) => {
    const{
        name,
        description,
        background_image,
        rating,
        released,
        platforms,
        genres
    }=req.body;

let objInfo={ name,description,background_image: background_image ? background_image : 'https://img.freepik.com/vector-gratis/consola-juegos-letras-letrero-neon-fondo-ladrillo_1262-11854.jpg?w=740&t=st=1669172056~exp=1669172656~hmac=e28863c9e27bdca4a8f20846ad1f6797d2186e727160fc3c0d2e98242bbe8dc8',rating,released,platforms}
    try{
        
            const videogameCreate= await Videogame.create(objInfo);
       let videogameGenre= await Genre.findAll({
            where: {name: genres}
        });
        await videogameCreate.addGenre(videogameGenre)
        return res.status(201).send('creado')
    } catch (error) {
        res.status(400).json(error.message);
    }
})


module.exports = router;