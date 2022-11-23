require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const {dbInfo}=require('./getVideogames')

const getDetail = async (id) => {
    let videogameInfo = []
    const apiInfo = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const idGame = await apiInfo.data
    const gameDetail = videogameInfo.push({
            name: idGame.name,
            background_image: idGame.background_image,
            rating: idGame.rating,
            released: idGame.released,
            platforms: idGame.platforms?.map((e) => e.platform.name),
            genres: idGame.genres?.map((gen) => gen.name),
            description: idGame.description.replace(/<[^>]*>?/g, ''),
    });
    return videogameInfo
};

const getDbDetail = async (id) => {
        const vgamesdb = await dbInfo();
        let gamesId = await vgamesdb.filter((gam) => gam.id === id)
        return gamesId
};

const dbApiDetail = async (id) => {
    const idDb = id.includes('-');
    if(idDb) {
        const videogameDb = await getDbDetail(id);
        return videogameDb
    }else{
        const videogameApi = await getDetail(id);
        return videogameApi;
    }
}
module.exports = {dbApiDetail}