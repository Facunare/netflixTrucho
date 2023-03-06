import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../custom_hooks/useFetch"
import NavBar from "../components/NavBar"
import ReactModal from "react-modal";
const MovieDetails = ()=>{
    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const [trailerKey, setTrailerKey] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [director, setDirector] = useState("")
    const [cast, setCast] = useState([])
    const [duracion, setDuracion] = useState("")
    const [media, setMedia] = useState([])
    useEffect(()=>{
        
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596`)
        .then(res => res.json())
        .then(data =>{
            // console.log(data)
            console.log(Boolean(data.title))
            setMovie(data)
            const minutos = data.runtime;
            const horas = Math.floor(minutos / 60);
            const minutosRestantes = minutos % 60;
            const duracion = `${horas}h ${minutosRestantes}m`;
            
            setDuracion(duracion)
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
        getMedia()
        a()
    } ,[id])

    const handleTrailerButtonClick = ()=>{
       setShowModal(true);
    }
    
    function handleCloseModal() {
        setShowModal(false);
      }

    const getMedia =()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596&append_to_response=videos,images`)
            .then(res=> res.json())
            .then(data=>{
                setMedia(data)
            })
    }

    const a = ()=>{
        const videos = document.querySelector('.videos')
        const backdrops = document.querySelector('.images')
        const posters = document.querySelector('.posters')
        const videoButton = document.querySelector('.videoButton')
        const backdropButton = document.querySelector('.backdropButton')
        const posterButton = document.querySelector('.posterButton')

        videoButton.addEventListener('click', ()=>{
            videos.style.display = "flex"
            backdrops.style.display = "none"
            posters.style.display = "none"
        })

        backdropButton.addEventListener('click', ()=>{
            videos.style.display = "none"
            backdrops.style.display = "flex"
            posters.style.display = "none"
        })

        posterButton.addEventListener('click', ()=>{
            videos.style.display = "none"
            backdrops.style.display = "none"
            posters.style.display = "flex"
        })

        
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
                            
                            <p className="runtime">{duracion}</p>
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
            <div className="container">

                <div className="castSection" >
                    <h1>Reparto principal</h1>

                    <div className="actorCards">

                        {cast.map(actor=>(
                            <a href={`../person/${actor.id}`} className="actorCard">
                            
                                {actor.profile_path ? <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt="" /> : <img src="/fondo-gris-claro-liso-liso_8087-1195.avif" alt="" />}
                                <div className="actorData">

                                    <p>{actor.name}</p>
                                    <p>{actor.character}</p>
                                </div>
                            </a>  
                        ))}
                    </div>
                    
                </div>
                <div className="aside_data">   
                    <h4>Titulo original</h4>
                    <p>{movie.title}</p>
                    <h4>Estado</h4>
                    <p>{movie.status}</p>
                    <h4>Idioma original</h4>
                    {movie.spoken_languages && <p>{movie.spoken_languages.map(lang=>lang.name)}</p>}
                    <h4>Duracion</h4>
                    <p>{duracion}</p>
                    <h4>Presupuesto</h4>
                    <p>${movie.budget}</p>
                    <h4>Ingresos</h4>
                    <p>${movie.revenue}</p>
                </div>
            </div>
            <div className="mediaSection">
                <div className="li">
                    <h3>Media</h3>  
                    <ul>
                        <li><button className="videoButton">Videos</button></li>
                        <li><button className="backdropButton">Backdrops</button></li>
                        <li><button className="posterButton">Posters</button></li>
                    </ul>
                </div>
                <div className="videos" style={{display: "none"}}>
                    {media.videos && media.videos.results.map(video =>(
                        <iframe className="modal"
                            title="Movie video"
                            width="100%"
                            height="95%"
                            src={`https://www.youtube.com/embed/${video.key}`}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    ))}
                </div>
                <div className="images">
                    {media.images && media.images.backdrops.map(image=>(
                        <img src={`https://image.tmdb.org/t/p/w200/${image.file_path}`} alt="" />
                    ))}
                </div>
                <div className="posters">
                    {media.images && media.images.posters.map(poster=>(
                        <img src={`https://image.tmdb.org/t/p/w200/${poster.file_path}`} alt="" />
                    ))}
                </div>
            </div>
        </div>
    )
}


export default MovieDetails