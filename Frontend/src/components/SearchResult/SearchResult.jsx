import React, {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, Navigate } from 'react-router-dom'
import "./SearchResult.css";
import bgGrad from "./../../assets/gradiend-bg.svg";
import axios from "axios";
import env from "dotenv"

const SearchResult = () => {
  const navigate = useNavigate()
  const [searchItem, setsearchItem] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const { images } = location.state || { images: [] };

  const searchImages= (e)=>{
    e.preventDefault()
    // console.log(searchItem)
    axios.get(("https://api.unsplash.com/search/photos"),{
      params:{
        query:searchItem,
      },
      headers:{
        Authorization: `${process.env.UNSPLASH_API_URL}`,
      }
    })
    .then(res=>{
      navigate('/results',{state:{images:res.data.results}})
      // setImages(res.data.results)
    })
    .then((res) => {
      for (let index = 0; index < res.length; index++) {
        console.log(res[index].id);
      }
    })    
    .catch(error=>{
      console.log(error)
    })
  }

  const handleClick = (image) =>{
    navigate("/image-details",{state:image});
  }

  // const handleClick = (image) =>{
  //   setSelectedImage(image);
  // }

  // useEffect(() => {
  //   if(selectedImage){
  //     console.log(selectedImage);
  //   }
  // }, [setSelectedImage,navigate])
  

  return (
    <div className="searchResult">
      <div className="searchResult__header">
        <img src={bgGrad} alt="background gradient" className="bg" />
      </div>
      <form onSubmit={searchImages} className="searchTab">
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setsearchItem(e.target.value)}
          placeholder="Enter your keywords..."
        />
      </form>

      <div
        className="image-results"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="image-item" onClick={()=> handleClick(image)}>
              <img src={image.urls.small} alt={image.alt_description} />
              {/* <p>{image.alt_description}</p> */}
            </div>
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
};
export default SearchResult;
