import React, { useState, useEffect, useRef } from 'react';
import useFetch from '../custom_hooks/useFetch';
import '../App.css' 
import Buttons from '../components/Buttons'
import MovieList from '../components/MovieList'
import NavBar from '../components/NavBar';
import Pagination from '../components/Pagination';

function PeliculasPopulares() {
  const [search, setSearch] = useState('')
  const [genres, setGenres] = useState([])
  const [languages, setLanguages] = useState([])
  const [range, setRange] = useState()
  const [firstDate, setFirstDate] = useState()
  const [lastDate, setLastDate] = useState()
  const date1Ref = useRef(null);
  const date2Ref = useRef(null);
  const [page, setPage] = useState(1)


  const [movies, fetchMovies] = useFetch()

  useEffect(() => {
    allMovies()
    getGenres()
    getLanguages()
  }, [page]);
  
  
  
  const allMovies = ()=>{
    
    fetchMovies(`https://api.themoviedb.org/3/movie/popular?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596&page=${page}`)
  }
  const getGenres = ()=>{
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596`)
      .then(res => res.json())
      .then(data => setGenres(data.genres))
  }
 
  const getLanguages = () =>{
  
    fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596`)
    .then(res => res.json())
    .then(data => setLanguages(data.sort((b,a) => b.english_name.localeCompare(a.english_name))))
  }


  const searchMovies = (e)=>{
    e.preventDefault()
    fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596&query=${search}`)    
  
  }
    
  const handleGenre = (e)=>{
    e.preventDefault()
    const idGenero = e.target.value
    fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596&with_genres=${idGenero}&page=${page}`)
  }
  
  const byLanguage = (e, lang) => {
    const idioma = e.target.value
    fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596&with_original_language=${idioma}&page=${page}`)
  }

  const orderBy = (type, data)=>fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596&sort_by=${data}.${type}&page=${page}`)

  const handleSubmitRange = (e)=>{
    e.preventDefault()
    fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596&vote_average.gte=${range}&vote_average.lte=10&page=${page}`)
  }

  const handleSubmitDate = (e) =>{
    e.preventDefault()
    setFirstDate(date1Ref.current.value)
    setLastDate(date2Ref.current.value)

    fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596&primary_release_date.gte=${firstDate}&primary_release_date.lte=${lastDate}&page=${page}`)
  }
  
    return (
      <div>
        <NavBar searchMovies={searchMovies} setSearch={setSearch}/>
        <main className='popularMain'>
          <aside className='popularAside'>
            <select name="" id="" onChange={byLanguage} className='languageChoose'>
              {languages.map(lang => (

                <option value={lang.iso_639_1} >{lang.english_name}</option>
              )
              )}
            </select>
            <div className='categorias'>
              {genres.map(genre =>(
                <button value={genre.id} onClick={handleGenre} className="genreButton">
                  {genre.name}
                </button>
              ))}

            </div>


            <Buttons orderBy={orderBy}/>

            <form action="" onSubmit={handleSubmitRange} className="range">
              <input type="range" onChange={(e)=>setRange(e.target.value)} min="0" max="10"/>
              <button>Filtrar</button>
            </form>
            
            <form action="" onSubmit={handleSubmitDate} className="dates">
              <input type="date" name="from" ref={date1Ref}/>
              <input type="date" name="to" ref={date2Ref} />
              <button>Filtrar</button>
            </form>            
          </aside>
          <section className='sectionMovies'>

            <MovieList movies={movies}/>
            <Pagination page={page} setPage={setPage}/>
          </section>
          
        </main>
      </div>
  );
}

export default PeliculasPopulares;
