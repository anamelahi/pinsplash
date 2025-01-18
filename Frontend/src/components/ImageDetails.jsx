import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import "../App.css";

const ImageDetails = () => {
  const location = useLocation();
  const image = location.state;
  const [collection, setCollection] = useState([]); //
  const [newCollectionName, setNewCollectionName] = useState(""); //to name a new collection
  const [popUp, setPopUp] = useState(false); //for modal

  const handleAddToCollection = () => {
    setPopUp(true);
    console.log("clicked");
  };
  const handleNewCollection = (e) => {
    // e.preventDefault();
    setNewCollectionName(e.target.value);
    // console.log(newCollectionName);
  };
  const handleSavedCollection = () => {};
  const handleNewCollectionBtn = () => {
    if (newCollectionName) {
      const newCollection = {
        name: newCollectionName,
        images: [],
        count: 0,
      };
      setCollection([...collection, newCollection]);
      //   console.log(collection);

      setNewCollectionName("");
    }
  };
  const handleAdd = (name) => {
    setCollection((prevCol) =>
      prevCol.map((p) => {
        if (p.name === name) {
          return {
            ...p,
            images: [...p.images, image],
            count: p.images.length + 1, // Increment count
          };
        }
        return p;
      })
    );
  };

  useEffect(() => {
    const body = document.body;
    if (popUp) {
      body.classList.add("dim-bg");
    }

    return () => {
      body.classList.remove("dim-bg");
    };
  }, [popUp]);

  if (!image) {
    return <div> the details of this image is not available. </div>;
  }
  return (
    <div className="image-details">
      <div className="image">
        <img src={image.urls.full} alt="image" />
      </div>
      <div className="details">
        <h4>{image.user.name}</h4>
        <p>
          Published on {new Date(image.created_at).toLocaleDateString("en-US")}
        </p>
        <button onClick={handleAddToCollection}>Add to Collection</button>
      </div>

      {/* POP UP WINDOW (modal) */}
      {popUp && (
        <div className="pop-up">
          <div className="add-to-coll">
            <h2>Add to Collections</h2>
            <button className="cross" onClick={() => setPopUp(false)}>
              <MdOutlineCancel />
            </button>
          </div>

          <div className="new">
            <input
              type="text"
              value={newCollectionName}
              onChange={handleNewCollection}
              placeholder="Enter collection name"
            />
            <button
              style={{ padding: "10px", width: "190px" }}
              onClick={handleNewCollectionBtn}
            >
              New Collection
            </button>
          </div>
          <div className="existing">
            <h3>Existing Collections</h3>
            {collection.length > 0 ? (
              collection.map((collection, index) => (
                <div
                  key={index}
                  onClick={() => handleAdd(collection.name)}
                  className="collection-name"
                >
                  {collection.images.length > 0 ? (
                    <img className="thumbnail" src={collection.images[0].urls.thumb} alt="" />
                  ) : (
                    // <p>No images in this collection</p>
                    <p></p>
                  )}
                  <div>
                    <p>{collection.name}</p>
                    <p>{collection.count} photos</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No collections available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetails;
