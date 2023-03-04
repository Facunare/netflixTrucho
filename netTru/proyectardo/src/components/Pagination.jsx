

const Pagination = ({setPage, page})=>{
    

    const pagination = () =>{
        const backButton = document.querySelector('.backButton')
        if(page<=1){
         alert("Esta es la ultima pagina")
        }else{
          setPage(page - 1)
    
        }
      }
    return(       
        <div className='pageButtons'>

                <button onClick={pagination} className="backButton">Back</button>
                <button onClick={()=>{setPage(page + 1)}}
                >Next</button>
        </div>
        
    )




}

export default Pagination