import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../custom_hooks/useFetch"
import NavBar from "../components/NavBar"

const PeopleDetails = ()=>{
    const { id } = useParams()
    const [person, setPerson] = useState({})
    const [pelis, setPelis] = useFetch([])

    useEffect(()=>{
      
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596`)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            setPerson(data)
        })

        setPelis(`https://api.themoviedb.org/3/discover/movie?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596&with_cast=${id}`)

    }, [id])


    
    return (
        <div>
            <NavBar></NavBar>
            
            <main className="peopleMain">
                <aside>
                    <img src={`https://image.tmdb.org/t/p/w300${person.profile_path}`} alt="" />
                    <div className="info">

                        <h2>Informacion personal</h2>
                        <h3>Conocido por</h3>
                        <p>{person.known_for_department}</p>
                        <h3>Popularidad</h3>
                        <p>{person.popularity}</p>
                        <h3>Sexo</h3>
                        <p>{person.gender === 2 ? "Masculino" : "Feminino"}</p>
                        <h3>Fecha de nacimiento</h3>
                        <p>{person.birthday}</p>
                        {person.deathday && <h3>Fecha de fallecimiento</h3>}
                        {person.deathday && <p>{person.deathday}</p>}
                        <h3>Lugar de nacimiento</h3>
                        <p>{person.place_of_birth}</p>
                        <h3>Tambien conocido como</h3>
                        <div className="alsoKnown">
                            {person.also_known_as && person.also_known_as.map(also=>(
                                <p>{also}</p>
                            ))}
                        </div>
                    </div>
                </aside>
                <section>
                    <h1>{person.name}</h1>
                    <h2>Biografia</h2>
                    <p className="biografia">{person.biography}</p>
                    <div className="conocidoPor">
                        <h2>Interpretaciones</h2>
                        <div className="knownby">
                            {pelis.map(peli=>(
                                <div className="peliCard">
                                    <img src={`https://image.tmdb.org/t/p/w200${peli.poster_path}`} alt=""  />
                                    <p>{peli.title}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                   
                </section>
            </main>

        </div>
       
    )
}


export default PeopleDetails