import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { videogameById } from "../../redux/actions";

export default function Details() {
    const dispatch=useDispatch();

    const videogameDetails= useSelector((state) => state.datails)
    const{id}=useParams();

    useEffect(() => {
        dispatch(videogameById(id));
    },[dispatch])

    return(
        <div>
            <div>
                {
                    videogameDetails.length > 0 
                    ? <div>
                        <img src={videogameDetails[0].background_image} alt='Videogame img' width='400px' height='400px'/>
                        <h2>{videogameDetails[0].name}</h2>
                        <div>{videogameDetails[0].genres?.map(gen => (gen.name ? gen.name : gen)).join(' | ')}</div>

                        <div>
                        <div>Rating: {videogameDetails[0].rating}</div>
                        <div>Released: {videogameDetails[0].released}</div>
                        <div>Platforms: {(videogameDetails[0].platforms).join(' , ')}</div>
                        <div>Description: {videogameDetails[0].description}</div>
                        </div>
                        </div> : <p>Cargando ...</p>
                }
            <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            </div>
        </div>
        </div>
    )
}