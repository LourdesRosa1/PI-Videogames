import axios from 'axios';
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";

// funcion con la que traigo los videogames
export function getVideogames () {
    return async function(dispatch) {
        try{
            const json= await axios.get('http://localhost:3001/videogames');
            return dispatch ({
                type:GET_VIDEOGAMES,
                payload:json.data
            })
        }catch (error) {
            console.log(error.message)
        }
    }
}