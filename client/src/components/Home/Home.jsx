import React from "react";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames, orderByName, orderByRating, filterByCreater } from "../../redux/actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar";


export default function Home () {
    const dispatch=useDispatch();

    let allVideogames=useSelector((state) => state.videogames);
    let [orden, setOrden] = useState('')

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

    function handleOrder(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPag(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleByRating(e) {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPag(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleByCreate(e) {
        e.preventDefault();
        dispatch(filterByCreater(e.target.value));
        setCurrentPag(1);
    }

    return(
        <div>
            <div><h1>Videogames</h1></div>

            <div>
                <button onClick={e => {handleClick(e)}}>Cargar Vidogames</button>
            </div>

            <div>
                <h3>Order Alfabético : </h3>
                <select onChange={e =>handleOrder(e)}>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z _ A</option>
                </select>
            </div>

            <div>
                <h3>Orden Rating : </h3>
                <select onChange={e => handleByRating(e)}>
                    <option value='alto'> Rating alto</option>
                    <option value='bajo'> Rating bajo</option>
                </select>
            </div>

            <div>
                <h3>Creados : </h3>
                <select onChange={e =>handleByCreate(e)}>
                <option value='All'> Todos </option>
                <option value='createdInDb'> Creados </option>
                <option value='api'> Api </option>
                </select>
            </div>

            <Paginado
            videogamePerPege={videogamePerPege}
            allVideogames={allVideogames.length}
            paginado={paginado}
            currentPage={currentPage}
            />

            <SearchBar/>

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