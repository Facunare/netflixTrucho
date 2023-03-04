
import MovieCard from './MovieCard'

const MovieList = ({movies}) =>{



    return (
      
        <div className='movies'>
          {movies.length === 0 ? (
            <p className='notMovies'>Not movies founded</p>
          ) : (
            movies.map(movie => (
              <MovieCard movie={movie} id={movie.id}/>
            ))
          )}
        </div>
      
    )
}

export default MovieList