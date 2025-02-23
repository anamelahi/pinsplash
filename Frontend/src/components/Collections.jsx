import React, { useState, useEffect } from "react";
import "./Collections.css";
import axios from "axios";
// import { useCollection } from "../context/CollectionContext";
import env from "dotenv"

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(`${process.env.VITE_BACKEND_API_URL}/collections`);
        setCollections(response.data);
      } catch (error) {
        console.log("ERROR FETCHING COLLECTIONS:", error);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div className="collections-page">
      <div className="header-coll">
        <h2>Collections</h2>
        <p>
          Explore the world through collections of beautiful photos free to use
          under the Unsplash License.
        </p>
      </div>
      <div className="coll">
        {collections.map((collection, index) => (
          <div key={index} className="collections-div">
            <div className="thumbnail">
              <img
                src={collection.thumbnail}
                alt={collection.collection_name}
                className="thumbnail"
              />
            </div>
            <div>{collection.collection_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
