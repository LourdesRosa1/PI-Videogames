import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getVieogameByName } from "../../redux/actions";
import style from './SearchBar.module.css'


export default function SearchBar() {
    const dispatch =useDispatch();
    let[name,setName]=useState('')

    const games = useSelector(state => state.videogames);
    const history=useHistory();

    function handleInput(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        // dispatch(getVieogameByName(name));
        // setName('')

        const nombre=games.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()))
        
        if(name && (!nombre || nombre.length === 0)){
            alert('No existe el juego ingresado!')
        }
        else if(!name){
            alert('¡Para buscar ingrese un nombre!')
        }
        else{
            dispatch(getVieogameByName(name))
            setName('')
        }
    }

    return(
        <div>
            <input
            className={style.boton}
            type='text'
            placeholder="Buscar Videogame..."
            onChange={(e) =>handleInput(e)}
            />
            <button className={style.boton2} type="submit" onClick={(e) =>handleSubmit(e)}> Buscar</button>
        </div>
    )
}