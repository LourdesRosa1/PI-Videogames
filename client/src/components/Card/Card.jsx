import React from "react";

export default function Card({name, background_image,genres}) {
    return (
        <div>
            <div><h3>{name}</h3></div>
            <div><img  src={background_image} alt='img not found' width='270px' height='260px'/></div>
            <h5>
                {genres?.map((e,i) => {
                    return <h4 key={i}>{e}</h4>
                })}
            </h5>
        </div>
    )
}