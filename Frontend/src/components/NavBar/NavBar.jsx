import React from 'react'
import logo from "../../assets/Logo.svg"
import "./NavBar.css"

const NavBar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={logo} alt="Logo" />
        <div className="menu">
            <h4>Home</h4>
            <h4>Collections</h4>
        </div>
    </div>
  )
}

export default NavBar