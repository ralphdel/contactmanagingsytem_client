import { Link, NavLink } from 'react-router-dom'
import '../css/navbar.css'
import { useContext } from 'react'
import { Usercontext } from '../App'
import { useState } from 'react'



const NavBar = () => {
 const{user}=useContext(Usercontext)



  return (
    <div className="NavBar">
      <div className="navbar-left">
        <NavLink to='/' className="navbar-brand">
          CONTACT MS
          <img src="" alt="img" />
        </NavLink>

      </div>
      <div className="navbar-right">
        {user
        ?
        <>
        <NavLink to='/' className="navbar-link">About</NavLink>
        <NavLink to='/dashboard' className="navbar-link">Contact</NavLink>
        <NavLink  to='/dashboard' className="navbar-link"> {user.name}</NavLink>
        <NavLink to='/login' className="navbar-link">Logout</NavLink>
        </>
        :
        <>
        <NavLink to='/about' className="navbar-link">About</NavLink>
        <NavLink to='/login' className="navbar-link">Login</NavLink>
        <NavLink to='/signup' className="navbar-link"> SignUp</NavLink>
        </>
        }
      
      </div>
    </div>
  )
}

export default NavBar