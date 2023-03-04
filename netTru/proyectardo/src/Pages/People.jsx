import { useEffect, useState } from "react"
import useFetch from "../custom_hooks/useFetch"
import Pagination from "../components/Pagination"
import '../App.css'
import NavBar from "../components/NavBar"

const People = ()=>{
    const [people, fetchPeople] = useFetch([])
     const [page, setPage] = useState(1)
    useEffect(()=>{
        allPeople()
    })

    const allPeople = ()=>{
        fetchPeople(`https://api.themoviedb.org/3/person/popular?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596&page=${page}`)
    }

    return (
        <div>
            <NavBar/>
            <h1 className="peopleTitle">Personas populares</h1>
            <div className="people">

                {people.map(person=>(
                    <a className="peopleCard" href={`person/${person.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`} alt="" />
                        <div className="peopleData">
                            <p>{person.name}</p>
                            <p>Popularity: {person.popularity}</p>
                        </div>
                    </a>
                ))}
            </div>
            <Pagination page={page} setPage={setPage}/>
        </div>
    ) 

}


export default People