import { useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import DefaultPage from "./components/DefaultPage/DefaultPage";
import SearchResult from "./components/SearchResult/SearchResult";
import ImageDetails from "./components/ImageDetails";
import Collections from "./components/Collections";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/results" element={<SearchResult />} />
        <Route path="/image-details" element={<ImageDetails />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
