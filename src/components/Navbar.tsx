import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function Navbar() {
    const { user, logout } = useAuthContext();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <NavLink className='navbar-brand' to='/'>Auction admin</NavLink>
            <div className="collapse navbar-collapse d-flex- justify-content-between align-items-center" >
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink className='nav-link' to='/'>Auctions</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/'>Products</NavLink>
                    </li>
                </ul>
                <div>
                    <span className="navbar-text mr-2">
                        {user?.firstName + ' ' + user?.lastName}
                    </span>
                    <button className='btn btn-danger mx-2' onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}
