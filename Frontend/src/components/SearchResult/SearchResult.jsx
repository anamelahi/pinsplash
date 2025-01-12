import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, Navigate } from 'react-router-dom'
import "./SearchResult.css";
import bgGrad from "./../../assets/gradiend-bg.svg";
import axios from "axios";

const SearchResult = () => {
  const navigate = useNavigate()
  const [searchItem, setsearchItem] = useState("");
  const location = useLocation();
  const { images } = location.state || { images: [] };

  const searchImages= (e)=>{
    e.preventDefault()
    console.log(searchItem)
    axios.get(("https://api.unsplash.com/search/photos"),{
      params:{
        query:searchItem,
      },
      headers:{
        Authorization: `Client-ID IopYdnsDXf6acMGS-lHg269KTvw2CX_7Wh7Dfl_KY_I`,
      }
    })
    .then(res=>{
      navigate('/results',{state:{images:res.data.results}})
      // setImages(res.data.results)
    })
    .catch(error=>{
      console.log(error)
    })
  }


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
            <div key={image.id} className="image-item">
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
