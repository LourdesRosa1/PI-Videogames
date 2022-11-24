import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVieogameByName } from "../../redux/actions";

export default function SearchBar() {
    const dispatch =useDispatch();
    let[name,setName]=useState('')

    function handleInput(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getVieogameByName(name));
        setName('')
    }

    return(
        <div>
            <input
            type='text'
            placeholder="Buscar Videogame..."
            onChange={(e) =>handleInput(e)}
            />
            <button type="submit" onClick={(e) =>handleSubmit(e)}> Buscar</button>
        </div>
    )
}