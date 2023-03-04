import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../custom_hooks/useFetch"
import NavBar from "./NavBar"

const MovieDetails = ()=>{
    const { id } = useParams()
    const [movie, setMovie] = useState({})

    useEffect(()=>{
      
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596`)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            setMovie(data)
        })
    }, [id])


    
    return (
        <div>
            <NavBar></NavBar>
            <div className="a">

                <div className="firstData" style={{backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`})`}}>

                    <h2>{movie.title}</h2>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    )
}


export default MovieDetails