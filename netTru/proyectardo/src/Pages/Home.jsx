
import { useEffect } from "react"
import useFetch from "../custom_hooks/useFetch"
import MovieCard from "../components/MovieCard"
import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
function Home () {

    const [trendingMovies, fetchMovies] = useFetch()

    useEffect(()=>{
        trending()
    })

    const trending = () =>{
        fetchMovies('https://api.themoviedb.org/3/trending/movie/day?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596')
    }


    return(
        <div>
            <NavBar/>
            <main className="home_main">
                <div>
                    <h1>Bienvenidos</h1>
                    <p>Millones de películas, programas de televisión y personas por descubrir. <br /> Explora ahora.</p>
                    <SearchBar page="home"/>
                </div>
            </main>
            <section className="trend_section">
                Tendencia
                <div className="cardMovie">
                    {trendingMovies.map(movie=>(
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home