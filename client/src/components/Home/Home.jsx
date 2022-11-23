import React from "react";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from "../../redux/actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado.jsx";


export default function Home () {
    const dispatch=useDispatch();

    let allVideogames=useSelector((state) => state.videogames);

    const[currentPage,setCurrentPag]=useState(1);
    const[videogamePerPege]=useState(15);
    const ultimaPagina=currentPage * videogamePerPege;
    const primeraPagian= ultimaPagina - videogamePerPege;
    const currentVideo=allVideogames.slice(primeraPagian, ultimaPagina)

    const paginado= pageNumber => {
        setCurrentPag(pageNumber)
    }

    useEffect(() => {
        paginado(1)
    },[allVideogames])

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

            <Paginado
            videogamePerPege={videogamePerPege}
            allVideogames={allVideogames.length}
            paginado={paginado}
            currentPage={currentPage}
            />

            {
                currentVideo?.map((e) => {
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