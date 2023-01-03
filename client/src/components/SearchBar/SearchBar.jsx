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
        
        if(name){
            dispatch(getVieogameByName(name))
            setName('')
        }
        
        else{
            alert('No se encontro videogame');
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