import { useState } from 'react'
import {BrowserRouter, Route, Router, Routes} from "react-router-dom"
import './App.css'
import NavBar from './components/NavBar/NavBar'
import DefaultPage from './components/DefaultPage/DefaultPage'
import SearchResult from './components/SearchResult/SearchResult'

function App() {

  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<DefaultPage />} />
      <Route path='/results' element={<SearchResult/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App; 