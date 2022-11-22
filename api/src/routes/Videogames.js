const {allVideoInfo} =require('../controller/getVideogames.js')
const {dbApiDetail}=require('../controller/getId')
const {postVideogame}=require('../controller/getPost.js')
const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');

const router = Router();

router.get('/videogames', async (req,res) => {
    try{
        const {name}=req.query;
        const resultsDb= await allVideoInfo();
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
    try{
        const{name,description,background_image,rating,released,platforms,genres}=req.body;
        const videoo=await postVideogame(name,description,background_image,rating,released,platforms,genres);
        res.status(201).send(videoo)
    } catch (error) {
        res.status(400).json(error.message);
    }
})

module.exports = router;