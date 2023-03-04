import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../custom_hooks/useFetch"
import NavBar from "./NavBar"

const PeopleDetails = ()=>{
    const { id } = useParams()
    const [person, setPerson] = useState({})

    useEffect(()=>{
      
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=dd4bd1e62fd7bef02e9f3da5f0b10596`)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            setPerson(data)
        })
    }, [id])


    
    return (
        <div>
            <NavBar></NavBar>
            <div className="">

                    <div className="">

                        <h2>{person.name}</h2>

                    </div>
            </div>
        </div>
    )
}


export default PeopleDetails