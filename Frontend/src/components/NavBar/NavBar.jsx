import React from 'react'
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import logo from "../../assets/Logo.svg"
import "./NavBar.css"

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
        <img className='logo' src={logo} alt="Logo" />
        <div className="menu">
            <h4 onClick={()=>navigate("/")}>Home</h4>
            <h4 onClick={()=> navigate("/collections")}>Collections</h4>
        </div>
    </div>
  )
}

export default NavBar