import React from "react";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from "../../redux/actions";
import Card from "../Card/Card";


export default function Home () {
    const dispatch=useDispatch();

    let allVideogames=useSelector((state) => state.videogames);

    useEffect(() => {
        dispatch(getVideogames());
    },[dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }

    return(
        <div>
            <div><h1>Videogames</h1></div>

            <div>
                <button onClick={e => {handleClick(e)}}>Cargar Vidogames</button>
            </div>

            {
                allVideogames?.map((e) => {
                    return(
                        <div key={e.id}>
                            <Card 
                            name={e.name}
                            background_image={e.background_image}
                            genres={e.genres}
                            key={e.id}
                            id={e.id}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}