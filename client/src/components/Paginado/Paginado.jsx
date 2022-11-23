import React from "react";


export default function LandingPage({videogamePerPege,currentPage, allVideogames, paginado }) {
    const pageNumbers=[];
    for(let i=1;i<= Math.ceil(allVideogames/videogamePerPege); i++) {
        pageNumbers.push(i)
    }
    if(currentPage === 8) {
        paginado(1)
    }

    return(
        <div>
            <button onClick={() => paginado(currentPage === 1 ? pageNumbers.length : currentPage - 1)}>«</button>
            {
                pageNumbers && pageNumbers.map(number => (
                    <button
                    key={number} 
                    onClick={() => paginado(number)}>{number}</button>
                ))
            }
            <button onClick={() => paginado(currentPage === 0 ? currentPage : currentPage + 1)}>»</button>
        </div>
    )
}