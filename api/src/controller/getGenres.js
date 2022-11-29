require('dotenv').config();
const { API_KEY } = process.env;
const { Genre } = require('../db.js');
const axios = require('axios');


const genresToDb = async () => {
    try{
       let genresDb = await Genre.findAll();
        if(!genresDb.length){
            let apiInfo = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
            let allGenres = apiInfo.data.results.map((genre) => (genre.name))
            for (let i = 0; i<allGenres.length; i++){
                await Genre.create({name: allGenres[i]})
            }
            genresDb = await Genre.findAll();
            return genresDb
            }
            return genresDb
    } catch (error) {
        console.log(error);
    }
    }


module.exports = {genresToDb}