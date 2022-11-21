require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
const { Op } = require("sequelize");

const allVideogames= async () => {
    let games=[];
    for(let i=1; i < 6; i++){
        const videogame= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
        const video=videogame.data.results;
        const vgames= video.map(e => {
            games.push({
                id:e.id,
                name:e.name,
                background_image:e.background_image,
                rating:e.rating,
                released:e.released,
                platforms: e.platforms.map((e) => e.platform.name),
                genres: e.genres?.map((gen) => gen.name),
            })      
        })
    } return games
}

const dbInfo= async (name) => {

        const resultsDb= await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            include:{
                model:Genre,
                attributes:['id','name'],
                through: {
                    attributes: [],
                },
            }
        })

        const db=resultsDb.map((video) => {
            return {
                id:e.id,
                name:e.name,
                background_image:e.background_image,
                rating:e.rating,
                released:e.released,
                platforms: e.platforms.map((e) => e.platform.name),
                genres: e.genres?.map((gen) => gen.name),
            }
        })
        return db
}

const allVideoInfo= async () => {
    const videoInfo= await allVideogames();
    const dbInfos= await dbInfo();
    const info= dbInfos.concat(videoInfo);
    return info
}

module.exports = {allVideoInfo, dbInfo, allVideogames}