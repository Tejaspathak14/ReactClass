import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Courses = () => {
  return (
    <div style={{height:"80vh"}}>
        <h2>Select your course:</h2>
        <nav>
            <NavLink to="offline" className="m-3">Offline</NavLink>
            <NavLink to="online">Online</NavLink>
        </nav>
        <Outlet/>
    </div>
  )
}

export default Courses