import { FILTER_BY_CREATE, GET_VIDEOGAMES, GET_VIDEOGAMES_BY_NAME, ORDER_BY_NAME, ORDER_BY_RATING } from "../actions";

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

            case GET_VIDEOGAMES_BY_NAME: 
            return{
                ...state,
                videogames:action.payload
            }

            case ORDER_BY_NAME:
                const order= action.payload === 'asc' ? state.videogames.sort((a,b) => {
                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                        return 1;
                    }
                    if (b.name.toUpperCase() > a.name.toUpperCase()) {
                        return -1
                    }
                    return 0;
                }) : state.videogames.sort((a,b) => {
                    if(a.name.toUpperCase() > b.name.toUpperCase()) {
                        return -1
                    }
                    if(b.name.toUpperCase() > a.name.toUpperCase()) {
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    videogames:order
                }

                case ORDER_BY_RATING:
                    const orden= action.payload === 'bajo'
                    ? state.videogames.sort((a,b) => {
                        return a.rating - b.rating
                    })
                    : state.videogames.sort((a,b) => {
                        return b.rating - a.rating
                    })
                    return {
                        ...state,
                        videogames: orden
                    }

                    case FILTER_BY_CREATE:
                        const filter= state.allVideogames
                        let filtervideo=filter
                        if(action.payload === 'createdInDb') 
                        filtervideo= filter.filter(p => isNaN(p.id))
                        if(action.payload === 'All') 
                        filtervideo= filter
                        if(action.payload === 'api') 
                        filtervideo= filter.filter(p => typeof p.id === "number")
                        return {
                            ...state,
                            videogames: filtervideo
                        }

            default:
                return state;
    }
}

export default rootReducer;