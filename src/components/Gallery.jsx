import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from '../context'
import { useState } from 'react'

const url ="https://api.unsplash.com/search/photos?client_id=Op2Nwkj0AztTahsjBwg1b2xXVsJdR7VzOktRoUT93nE"
const IMAGES_PER_PAGE = 40

const Gallery = () => {
  const {searchTerm,}= useGlobalContext()
  const [page,setPage]= useState(0)
  
  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery({
    queryKey:['images',searchTerm,page],
    queryFn: async () =>{
      const result = await axios.get(`${url}&query=${searchTerm}&page=${page}&per_page=${IMAGES_PER_PAGE}`)
      return result.data
    },
  keepPreviousData:true
     })

  
  
 
  if(isLoading){
    return(
      <section className='image-container'>
        <h4>Loading...</h4>
      </section>
    )
  }
  if(isError){
    return(
      <section className='image-container'>
        <h4>Error...</h4>
      </section>
    )
  }
  const results = data.results;
  const totalpages = data.total_pages
  console.log(totalpages)
  
  
  if (results.length < 1) {
    return (
      <section className='image-container'>
        <h4>No results found...</h4>
      </section>
    );
  }


  return (
    <section className='image-container'>
     {results.map((item)=>{
      const url = item ?.urls ?.regular
      return <img src={url} key ={item.id} alt={item.alt_description} className='img'/>
     })}
 <button className='btn'
        onClick={() => setPage((oldValue) => oldValue === 0 ? 0 : oldValue - 1)}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button className='btn'
        disabled={isPreviousData}
        onClick={() => {
          if (!isPreviousData) setPage((old) => old + 1);
        }}
      >
        Next Page
      </button>
 
    </section>
  )
}

export default Gallery