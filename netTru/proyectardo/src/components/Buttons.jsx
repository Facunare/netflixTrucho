import React from 'react';

const Buttons = ({orderBy}) =>{
    return (
        <div className='buttons'>
           <button className='buttonOrderBy' onClick={()=> orderBy("asc", "popularity")}>Popularidad ascendente</button>
           <button className='buttonOrderBy' onClick={()=> orderBy("desc", "popularity")}>Popularidad descendente</button>
           <button className='buttonOrderBy' onClick={()=> orderBy("asc", "vote_average")}>Valoracion ascendente</button>
           <button className='buttonOrderBy' onClick={()=> orderBy("desc", "vote_average")}>Valoracion descendente</button>
           <button className='buttonOrderBy' onClick={()=> orderBy("asc", "title")}>Titulo (A-Z)</button>
           <button className='buttonOrderBy' onClick={()=> orderBy("desc", "title")}>Titulo (Z-A)</button>
        </div>
    )
}

export default Buttons;