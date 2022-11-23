require('dotenv').config();
const { API_KEY } = process.env;
const { Genre } = require('../db.js');
const axios = require('axios');


const genresToDb = async () => {
    let genresDb = await Genre.findAll();
    if(!genresDb.length){
        let apiInfo = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        let allGenres = apiInfo.data.results.map((genre) => (genre.name))
        for (let i = 0; i<allGenres.length; i++){
            await Genre.create({name: allGenres[i]})
        }
        genresDb = await Genre.findAll();
        return genresDb
        };
    }


module.exports = {genresToDb}