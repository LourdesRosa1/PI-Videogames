require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');


const getByname= async (name) => {
        const videogame= await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        try{
            const video=videogame.data.results.map(e => {
                return ({
                    id:e.id,
                    name:e.name,
                    description: e.description,
                    background_image:e.background_image,
                    rating:e.rating,
                    released:e.released,
                    platforms: e.platforms.map((e) => e.platform.name),
                    genres: e.genres.map((gen) => {
                        return gen.name
                    }),
                })      
            })
            return video
        } catch (erro) {
            console.log('no se encontro videogame');
        }
}

module.exports={getByname}