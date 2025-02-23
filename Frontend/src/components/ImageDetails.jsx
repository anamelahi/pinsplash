import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import "../App.css";

const ImageDetails = () => {
  const location = useLocation();
  const image = location.state;
  const [collection, setCollection] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [popUp, setPopUp] = useState(false);

  // Open modal
  const handleAddToCollection = () => {
    setPopUp(true);
  };

  // Handle input change for new collection name
  const handleNewCollection = (e) => {
    setNewCollectionName(e.target.value);
  };

  // Create a new collection (API call)
  const handleNewCollectionBtn = async (e) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    try {
      const response = await axios.post("http://localhost:3000/collections", {
        name: newCollectionName,
      });

      // Update UI with new collection
      setCollection([...collection, response.data]);
      setNewCollectionName(""); // Clear input
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  // Add image to a collection (API call)
  const handleAdd = async (collectionName) => {
    try {
      await axios.post(`http://localhost:3000/collections/${collectionName}/add-image`, {
        image_url: image.urls.full, // sending the image URL
      });
  
      // UI updates
      setCollection((prev) =>
        prev.map((col) =>
          col.collection_name === collectionName
            ? { ...col, count: (col.count ?? 0) + 1 }
            : col
        )
      );
      
    } catch (error) {
      console.error("Error adding image to collection:", error);
    }
  };
  

  // Fetch collections from the database
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("http://localhost:3000/collections");
        setCollection(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  // Dim background when modal is open
  useEffect(() => {
    document.body.classList.toggle("dim-bg", popUp);
    return () => document.body.classList.remove("dim-bg");
  }, [popUp]);

  if (!image) {
    return <div>The details of this image are not available.</div>;
  }

  return (
    <div className="image-details">
      <div className="image">
        <img src={image.urls.full} alt="image" />
      </div>
      <div className="details">
        <h4>{image.user.name}</h4>
        <p>Published on {new Date(image.created_at).toLocaleDateString("en-US")}</p>
        <button onClick={handleAddToCollection}>Add to Collection</button>
      </div>

      {/* POP-UP MODAL */}
      {popUp && (
        <div className="pop-up">
          <div className="add-to-coll">
            <h2>Add to Collections</h2>
            <button className="cross" onClick={() => setPopUp(false)}>
              <MdOutlineCancel />
            </button>
          </div>

          {/* NEW COLLECTION FORM */}
          <form className="new" onSubmit={handleNewCollectionBtn}>
            <input
              type="text"
              name="name"
              placeholder="Enter collection name"
              value={newCollectionName}
              onChange={handleNewCollection}
            />
            <button type="submit" style={{ padding: "10px", width: "190px" }}>
              New Collection
            </button>
          </form>

          {/* EXISTING COLLECTIONS */}
          <div className="existing">
            <h3>Existing Collections</h3>
            {collection.length > 0 ? (
              collection.map((col, index) => (
                <div
                  key={index}
                  onClick={() => handleAdd(col.collection_name)}
                  className="collection-name"
                >
                  <p>{col.collection_name}</p>
                  <p>{col.count ?? 0} photos</p>
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
