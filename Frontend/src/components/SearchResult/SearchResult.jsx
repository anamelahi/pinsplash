import React from "react";
import { useLocation } from "react-router-dom";
import "./SearchResult.css";
import bgGrad from "./../../assets/gradiend-bg.svg";

const SearchResult = () => {
  const location = useLocation();
  const { images } = location.state || { images: [] };
  return (
    <div className="searchResult">
      <div className="searchResult__header">
        <img src={bgGrad} alt="background gradient" className="bg" />
      </div>

      <div className="image-results" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
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
//   {/* Display images */}
//   <div className="image-results">
//   {images.length > 0 &&
//     images.map((image) => (
//       <div key={image.id} className="image-item">
//         <img src={image.urls.small} alt={image.alt_description} />
//         <p>{image.alt_description}</p>
//       </div>
//     ))}
// </div>
export default SearchResult;
