const {allVideoInfo, dbInfo} =require('../controller/getVideogames.js')
const {dbApiDetail}=require('../controller/getId')
const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');
const { getByname } = require('../controller/getByNmae');
const { Op } = require('sequelize');

const router = Router();

// router.get('/videogames', async (req,res) => {
//     const {name}=req.query;
//     if(!name){
//     try{
//         //console.log('resultsDb: ',resultsDb);
//         const resultsDb= await allVideoInfo();
//         res.status(200).json(resultsDb)
//     } catch (error) {
//         res.status(400).json(error.message)
//     }
// } else {
//     const allVideoName= await getByname(name);
//     const nameDb= await dbInfo(name);
//     let gamesInDb = nameDb.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
//     let allGames = gamesInDb.concat(allVideoName);
//     allGames.length?
//     res.status(200).send(allGames)
//     : res.status(400).send('nombre no encontrado');  
// }
// })

router.get('/videogames', async (req, res) => {
    const {name}=req.query
    try {
        if(name) {
            const nameAp= await getByname(name);
            const nameVid= await Videogame.findAll({
                where:{
                    name: {[Op.iLike]:`%${name}%`}
                }
            })
            let allName= nameVid.concat(nameAp)
            allName.length? res.status(200).send(allName) : res.status(400).send('No se encontro nombre')
        } else {
            const resultsDb=await allVideoInfo();
            resultsDb.length? res.status(200).send(resultsDb) : res.status(400).send('Error')
        }
    } catch(erro) {
        res.status(400).json(erro.message)
    }
    }
)


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