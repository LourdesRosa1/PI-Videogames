import { GET_VIDEOGAMES } from "../actions";

const initialState={
    allVideogames:[],
    videogames:[]
}

function rootReducer (state=initialState, action) {
    switch(action.type) {
        case GET_VIDEOGAMES:
            return{
                ...state,
                allVideogames:action.payload,
                videogames:action.payload,
            };

            default:
                return state;
    }
}

export default rootReducer;