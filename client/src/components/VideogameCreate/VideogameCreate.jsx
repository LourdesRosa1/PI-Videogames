import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postVideogame , getVideogames} from "../../redux/actions";

function validate(input) {
    let errors={};
    if(input.name === ''){
        errors.name = 'Es necesario un nombre'
    }
    if(input.description === ''){
        errors.description = 'Es necesario una descripción'
    }
    if(input.released === ''){
        errors.released = 'Es necesario una fecha de lanzamiento'
    }
    if(input.rating < 0 || input.rating > 5 ){
        errors.rating = 'Debe ser mayor a 0 y menor o igual a 5'
    }
    if (!input.platforms){
        errors.platforms = 'Plataforma es requerida'
    }
    if (!input.genres){
        errors.genres = 'Genero es requerido'
    }
    return errors;
}

export default function VideogameCreate () {
    const dispatch=useDispatch();
    const allGenres=useSelector(state => state.genres);
    const games = useSelector(state => state.videogames);
    const history=useHistory();
    const [errors, sertErrors]=useState({});
    
    const [input, setInput]= useState({
                name:'',
                description:'',
                background_image:'',
                rating:0,
                released:'',
                platforms: [],
                genres:[]
    })

    useEffect(() => {
        dispatch(getGenres());
        },[dispatch])

        useEffect(() => {
            dispatch(getVideogames());
            },[dispatch])

        const handleOnChange= (e) => {
            e.preventDefault();
            if(e.target.type === 'text')
            setInput({...input, [e.target.name]: e.target.value.toLowerCase()})
            else if(e.target.type === 'number')
            setInput({...input, [e.target.name]: e.target.value})
            else setInput({...input, [e.target.name]:e.target.value})

            sertErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }

        const handleSelect= (e) => {
            setInput({
                ...input,
                genres:[...input.genres, e.target.value]
            })

            sertErrors(validate( {
                ...input,
                genres: [...input.genres, e.target.value],
            }))
        }

        const handlePlataforms= (e) => {
            setInput({
                ...input,
                platforms:[...new Set([...input.platforms, e.target.value])]
            })
            
            sertErrors(validate( {
                ...input,
                platforms: [...input.platforms, e.target.value],
            }))
        }

        const setArray = [];
        games.map(e => e.platforms?.map(e => setArray.push(e)));
        let newSet = [...new Set(setArray)];

        const handleOnSubmit= (e) => {
            e.preventDefault();
            dispatch(postVideogame(input));
            setInput(({
                name:'',
                description:'',
                background_image:'',
                rating:0,
                released:'',
                platforms:[],
                genres:[]
            }));
            history.push('/home')
        }

        return(
            <div>
                <Link to='/home'><button>Volver</button></Link>
                <h1>Crear Videogame: </h1>

                <div>
                    <form onSubmit={(e) => handleOnSubmit(e)}>
                    
                    <div>
                        <label>Nombre: </label>
                        <input type='text' value={input.name} name='name' placeholder='Nombre...' onChange={(e) => handleOnChange(e)}/>
                        {errors.name && (<p>{errors.name}</p>)}
                    </div>

                    <div>
                        <label>Descripción: </label>
                        <input type='text' value={input.description} name='description' placeholder='Description...' onChange={(e) => handleOnChange(e)}/>
                        {errors.description && (<p>{errors.description}</p>)}
                    </div>

                    <div>
                        <label>Rating: </label>
                        <input type='number' value={input.rating} name='rating' placeholder='Rating...' onChange={(e) => handleOnChange(e)}/>
                        {errors.rating && (<p>{errors.rating}</p>)}
                    </div>

                    <div>
                        <label>Fecha de lanzamiento: </label>
                        <input type='text' value={input.released} name='released' placeholder='Released...' onChange={(e) => handleOnChange(e)}/>
                        {errors.released && (<p>{errors.released}</p>)}
                    </div>

                    <div>
                        <label>Imagen: </label>
                        <input type='url' value={input.background_image} name='background_image' placeholder='Image...' onChange={(e) => handleOnChange(e)}/>
                        
                    </div>

                    <div>
                        <label>Generos: </label>
                <select onChange={(e) => handleSelect(e)}>
                    {errors.genres && (<p>{errors.genres}</p>)}
                    { allGenres?.map((genre, i) => {
                            return <option key ={i} value={genre.name} >{genre.name}</option>
                        })
                        }
                </select> 
                <li>{input.genres?.map(e => e + ',')}</li>
                    </div>

                    <div>
                        <label>Plataforms: </label>
                        <select onChange={(e) => handlePlataforms(e)}>
                        {errors.platforms && (<p>{errors.platforms}</p>)}
                        <option value='plat'></option>
                        { newSet.map(e => {
                        return( <option key={e} value={e}>{e}</option>)})}
                        </select> 
                        <li>{input.platforms?.map(e => e + ',')}</li>
                    </div>

                    <button type="submit" > Crear Videogame </button>
                    </form>
                </div>
            </div>
        )
}