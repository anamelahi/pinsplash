import React from 'react'
import { useLocation } from 'react-router-dom'
import "../App.css"

const ImageDetails = () => {
    const location = useLocation()
    const image = location.state;

    if(!image){
        return <div> the details of this image is not available. </div>
    }
  return (
    <div className='image-details'>
        <div className="image">
            <img src={image.urls.full} alt="image"/>
        </div>
        <div className="details">
            <h4>{image.user.name}</h4>
            <p>Published on {new Date(image.created_at).toLocaleDateString('en-US')}</p>
            <button>Add to Collection</button>
        </div>
    </div>
  )
}

export default ImageDetails