import axios from 'axios';
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_NAME= 'GET_VIDEOGAMES_BY_NAME';
export const GET_GENRES= 'GET_GENRES';
export const ORDER_BY_NAME= 'ORDER_BY_NAME';
export const ORDER_BY_RATING= 'ORDER_BY_RATING';
export const FILTER_BY_GENRES='FILTER_BY_GENRES';
export const FILTER_BY_CREATE= 'FILTER_BY_CREATE';
export const LIMPIAR_DETALLE='LIMPIAR_DETALLE'
export const VIDEOGAME_BY_ID='VIDEOGAME_BY_ID';
export const POST_VIDEOGAME='POST_VIDEOGAME';


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

//funcion para obtener vieogmes por nombre
export function getVieogameByName (name) {
    return async function (dispatch) {
        try{
        const json= await axios.get(`http://localhost:3001/videogames?name=${name}`);
        return dispatch ({
            type:GET_VIDEOGAMES_BY_NAME,
            payload:json.data
        })
    } catch (error) {
        console.log(error.message)
    }
}
}

//function para obtener generos de vidogame 
export function getGenres () {
    return async function (dispatch) {
        try{
            const genres= await axios.get('http://localhost:3001/genres');
            return dispatch({
                type: GET_GENRES,
                payload:genres.data
            })
        }  catch (error) {
            console.log(error.message)
        }
    }
}

//detalle de videogames por id
export function videogameById (id) {
    return async function(dispatch) {
        try{
            const json= await axios.get(`http://localhost:3001/videogame/${id}`);
            return dispatch({
                type:VIDEOGAME_BY_ID,
                payload:json.data
            })
        }catch (error) {
            console.log(error.message)
        }
    }
}

//funcion para crear videogame
export function postVideogame (payload) {
    return async function(dispatch) {
        try{
            const json= await axios.post('http://localhost:3001/videogames', payload);
            return dispatch({
                type:POST_VIDEOGAME
            })
        }catch (error) {
            console.log(error.message)
        }
    }
}

//----filtro para obtener generos----
export function filterByGeneres(payload) {
    return {
        type:FILTER_BY_GENRES,
        payload
    }
}

//----filtros por Creados----
export function filterByCreater (payload) {
    return{
        type: FILTER_BY_CREATE,
        payload
    }
}


//-------filtro orden alfabético-----
export function orderByName (payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

//--------filtro por rating--------
export function orderByRating (payload) {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}



//LIMPIAR DETALLE 
export function limpiarDetalle () {
    return {
        type:LIMPIAR_DETALLE
    }
    }