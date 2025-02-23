import React, {useState} from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import axios from "axios"
import "./DefaultPage.css"
import env from "dotenv"

const DefaultPage = () => {
  const navigate = useNavigate()
  const [searchItem, setSearchItem] = useState("");
  const [images, setImages] = useState([]);

  const searchImages = (e)=>{
    e.preventDefault();
    console.log("clicked")
    axios.get("https://api.unsplash.com/search/photos",{
      params:{query: searchItem},
      headers: {
        "Authorization": `${process.env.VITE_UNSPLASH_API_KEY}`,
      }      
    })
    .then(res=>{
      navigate('/results',{state:{images:res.data.results}})
      res.data.results.forEach(photos => {
        console.log(photos.id)
      });
      setImages(res.data.results)
    }) 
    .catch(err=>console.log(err))
  }
  return (
    <div className='default'>
        <div className="left"></div>
        <div className="center">
            <h1>Search</h1>
            <p>Search high-resolution images from Unsplash</p>
            <form >
            <input type="text" value={searchItem} onChange={e=> setSearchItem(e.target.value)} placeholder='Enter your keywords...' />
            <button type="submit" onClick={searchImages}>Search</button>
            </form>
          
        </div>
        <div className="right"></div>
    </div>
  )
}

export default DefaultPage