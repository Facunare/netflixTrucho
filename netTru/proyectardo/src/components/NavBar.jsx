
import SearchBar from './SearchBar'

const NavBar = ({searchMovies, setSearch})=>{
    return (
        <header>
          <div className='logo_list'>

            <a href="/"><img src="/kindpng_571833.png" alt="logo - MovieDB" /></a>

            <ul>
              <li className='header__li'><a className='header__A' href="/popular">Populares</a></li>
              <li className='header__li'><a className='header__A' href="/now">En cartelera</a></li>
              <li className='header__li'><a className='header__A' href="/nextMovies">Proximamente</a></li>
              <li className='header__li'><a className='header__A' href="/personalities">Personas</a></li>
            </ul>
          </div>
          
          <SearchBar setSearch={setSearch} searchMovies={searchMovies}/>
        </header>
    )
}

export default NavBar