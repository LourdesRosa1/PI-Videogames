const { Videogame, Genre } = require('../db.js');

const postVideogame= async (name,description,background_image,rating,released,platforms,genres,createInDB) => {
    const videogameCreate= await Videogame.create({
        name,
        description,
        background_image,
        rating,
        released,
        platforms,
        genres,
        createInDB
    });
    const videogameGenre= await Genre.findAll({
        where: {name: genres}
    });
    await videogameCreate.addGenre(videogameGenre)
    return videogameCreate

}
module.exports = {postVideogame}