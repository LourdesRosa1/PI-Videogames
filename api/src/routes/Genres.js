const { Router } = require('express');
const {genresToDb}= require('../controller/getGenres.js')

const router = Router();

router.get('/genres',async (req, res) => {
    try{
        const genre= await genresToDb()
        return res.status(200).send(genre);
    }catch (error) {
        res.status(400).json(error.message)
    };
});

module.exports = router;