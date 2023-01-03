import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postVideogame , getVideogames, deleteI} from "../../redux/actions";
import style from './VideogameCraete.module.css'



export default function VideogameCreate () {
    const dispatch=useDispatch();
    const allGenres=useSelector(state => state.genres);
    const games = useSelector(state => state.videogames);
    const history=useHistory();
    const [errors, sertErrors]=useState({});
    
    function validate(input) {
        let errors={};
        if(input.name === ''){
            errors.name = 'Es necesario un nombre'
        }
        else if(games.find(
            (el) => el.name.toLowerCase() === input.name.toLowerCase()
        )) {
            errors.name= 'El nombre ya existe. Utilice un nombre diferente'
        }
        if(input.description === ''){
            errors.description = 'Es necesario una descripción'
        }
        if(input.released === ''){
            errors.released = 'Es necesario una fecha de lanzamiento'
        }
        if(!input.rating){
            errors.rating = 'Es necesario colocar el Rating'
        } else if(input.rating < 0 || input.rating > 5 ) {
            errors.rating = 'Debe ser mayor a 0 y menor o igual a 5'
        }
        if (!input.platforms || input.platforms.length === 0){
            errors.platforms = 'Plataforma es requerida'
        }
        if (!input.genres|| input.genres.length === 0) {
            errors.genres = 'Genero es requerido'
        }
        return errors;
    }
    
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

        function handleDeleteGenre(e,d){
            e.preventDefault();
            setInput({
                ...input,
                genres: input.genres.filter(gen => gen !== d)
            });
        };

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
        function handleDeletePlatform(e,c){
            e.preventDefault();
            setInput({
                ...input,
                platforms: input.platforms.filter(plat => plat !== c)
            });
        };

        const setArray = [];
        games.map(e => e.platforms?.map(e => setArray.push(e)));
        let newSet = [...new Set(setArray)];

        const handleOnSubmit= (e) => {
            e.preventDefault();
            dispatch(postVideogame(input))
                setInput(({
                    name:'',
                    description:'',
                    background_image:'',
                    rating:0,
                    released:'',
                    platforms:[],
                    genres:[]
                }));
                alert('Videogame Creado')
                history.push('/home')
        }

        return(
            <div className={style.fondo}>
                <br/>
                <h1 className={style.titulo}>Crear Videogame: </h1>
                <div className={style.create}>
                    <form className={style.content} onSubmit={(e) => handleOnSubmit(e)}>
                    
                    <div>
                        <label >Nombre: </label>
                        <input type='text' value={input.name} name='name' placeholder='Nombre...' onChange={(e) => handleOnChange(e)} required/>
                        {errors.name && (<p className={style.error}>{errors.name}</p>)}
                    </div>
                    <br/>

                    <div>
                        <label>Descripción: </label>
                        <input type='text' value={input.description} name='description' placeholder='Description...' onChange={(e) => handleOnChange(e)} required/>
                        {errors.description && (<p className={style.error}>{errors.description}</p>)}
                    </div>
                    <br/>

                    <div>
                        <label>Rating: </label>
                        <input type='number' value={input.rating} name='rating' placeholder='Rating...' onChange={(e) => handleOnChange(e)} required/>
                        {errors.rating && (<p className={style.error}>{errors.rating}</p>)}
                    </div>
                    <br/>

                    <div>
                        <label>Fecha de lanzamiento: </label>
                        <input type='text' value={input.released} name='released' placeholder='dd/mm/aaaa' required onChange={(e) => handleOnChange(e)} />
                        {errors.released && (<p className={style.error}>{errors.released}</p>)}
                    </div>
                    <br/>

                    <div>
                        <label>Imagen: </label>
                        <input type='url' value={input.background_image} name='background_image' placeholder='Image...' onChange={(e) => handleOnChange(e)} />
                        
                    </div>
                    <br/>

                    <div>
                        <label>Generos: </label>
                <select onChange={(e) => handleSelect(e)} >
                    { allGenres?.map((genre, i) => {
                        return <option key ={i} value={genre.name}>{genre.name}</option>
                    })
                }
                </select> 
                <br/>
                {input.genres.map((c,i) =>
                            <span key={i}> {c}
                                <button className={style.eliminar} onClick={(e) =>handleDeleteGenre(e, c)}>x</button>
                                </span>
                                )}
                                {errors.genres && (<p className={style.error}>{errors.genres}</p>)}
                
                    </div>
                    <br/>

                    <div>
                        <label>Plataforms: </label>
                        <select onChange={(e) => handlePlataforms(e)} >
                        <option value='plat'></option>
                        { newSet.map(e => {
                            return( <option key={e} value={e} >{e}</option>)})}
                        </select>
                        <br/>
                            {input.platforms.map((c,i) =>
                            <span key={i}> {c}
                                <button className={style.eliminar} onClick={(e) => handleDeletePlatform(e, c)}>x</button>
                                </span>
                                )}
                                {/* <li>{input.platforms?.map(e => e + ',') }</li> */}
                        
                        {errors.platforms && (<p className={style.error}>{errors.platforms}</p>)} 
                    </div>

                    <br/>
                    <br/>
                    <button className={style.titulo} type="submit" > Crear Videogame </button>
                    </form>
                </div>
                <br/>
                <br/>
                <Link to='/home'><button  className={style.boton}>Volver</button></Link>
                <br/>
            </div>
        )
}