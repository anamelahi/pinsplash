import React from "react";
import "./Collections.css";
import { useCollection } from "../context/CollectionContext";

const Collections = () => {
  const { collections } = useCollection();
  return (
    <div className="collections-page">
      <div className="header-coll">
        <h2>Collections</h2>
        <p>
          Explore the world through collections of beautiful photos free to use
          under the Unsplash License.
        </p>
      </div>
      {collections.length === 0 ? (
        <p>No Collections available</p>
      ) : (
        collections.map((collection, i) => (
          <div key={i} className="collections">
            <h3>{collection.name}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default Collections;
