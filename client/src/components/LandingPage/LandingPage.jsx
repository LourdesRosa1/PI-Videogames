import React from "react";
import { Link } from 'react-router-dom'
import video from '../Home/Homee.mp4'
import style from './LandingPage.module.css'

export default function LandingPage() {
    return(
        <div>
            <video className={style.video} muted autoPlay loop>
			<source src={video} type="video/mp4" />
			</video>

            <h1 className={style.tit}>VIDEOGAMES PI</h1>
            <Link to='/home'>
                <button className={style.btn}>INGRESAR</button>
            </Link>
        </div>
    )
}