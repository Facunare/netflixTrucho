import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../custom_hooks/useFetch"
import NavBar from "./NavBar"
import ReactModal from "react-modal";
const MovieDetails = ()=>{
    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const [trailerKey, setTrailerKey] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [director, setDirector] = useState("")
    const [cast, setCast] = useState([])

    useEffect(()=>{
        
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596`)
        .then(res => res.json())
        .then(data =>{
            // console.log(data)
            console.log(Boolean(data.title))
            setMovie(data)
        })

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596`)
        .then(res=> res.json())
        .then(data=>{
            const trailer = data.results.find((video)=> video.type === "Trailer")
            if(trailer){
                setTrailerKey(trailer.key)
            }
        })

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596`)
        .then(res=>res.json())
        .then(data=>{
            const direc = data.cast.find(person=> person.known_for_department === "Directing" )
            setDirector(direc)

            const reparto = data.cast.filter(cs => cs.known_for_department == "Acting")
            setCast(reparto)
            console.log(reparto)
        })

        
    } ,[id])

    const handleTrailerButtonClick = ()=>{
       setShowModal(true);
    }
    
    function handleCloseModal() {
        setShowModal(false);
      }

    return (
        <div>
            <NavBar></NavBar>
            <div className="a">

                <div className="firstData">

      
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="secondData">

                        <a className="movieTitle" href={`../movie/${movie.id && movie.id}`}>{movie.title} <span>({movie.release_date && movie.release_date.substr(0,4)})</span></a>
                        <div className="genres">
                            {movie.genres && movie.genres.map((genre, index) => (
                                <span key={genre.id && genre.id}>
                                {genre.name}
                                {index !== movie.genres.length - 1 ? " -" : ""}
                                &nbsp;
                                </span>
                            ))}
                            </div>
                            <div className="thirdData">

                                <p className="vote_average_detail" style={movie.vote_average < 5 ? {border: "5px solid red"} : {border: "5px solid #21d07a"}}>{movie.vote_average && movie.vote_average.toFixed(1)}</p>
                                
                                <div>
                                    <button onClick={handleTrailerButtonClick}>Ver trailer</button>
                                    <ReactModal isOpen={showModal} onRequestClose={handleCloseModal} contentLabel="Movie Trailer" style={{overlay: {backgroundColor: "rgba(0, 0, 0, 0.75)"}, content: {
                                        top: "50%",
                                        left: "50%",
                                        right: "auto",
                                        bottom: "auto",
                                        marginRight: "-50%",
                                        transform: "translate(-50%, -50%)",
                                        width: "80%",
                                        height: "80%",
                                        backgroundColor: "black"
                                        },}}>
                                            <button onClick={handleCloseModal} className="closeButton">X</button>
                                        <iframe className="modal"
                                        title="Movie Trailer"
                                        width="100%"
                                        height="95%"
                                        src={`https://www.youtube.com/embed/${trailerKey}`}
                                        frameBorder="0"
                                        allowFullScreen
                                        ></iframe>
                                    </ReactModal>
                                </div>
                            </div>
                            <em className="tagline">{movie.tagline}</em>
                            <h3 className="VistaGeneral">Vista general</h3>
                            <p className="overview">{movie.overview}</p>
                            <div className="director">
                                {director && director.id && <a href={`../person/${director.id}`}>{director.name}</a>}
                                {director && director.known_for_department && <p>{director.known_for_department}</p>}
                            </div>
                    </div>
                </div>
            </div>
            <div className="castSection" >
                <h1>Reparto principal</h1>

                <div className="actorCards">

                    {cast.map(actor=>(
                        <a href={`../person/${actor.id}`} className="actorCard">
                        
                            <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt="" />
                            <div className="actorData">

                                <p>{actor.name}</p>
                                <p>{actor.character}</p>
                            </div>
                        </a>  
                    ))}
                </div>
            </div>
        </div>
    )
}


export default MovieDetails