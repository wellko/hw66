import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";

const NavBar = () => {
    const navigation = useNavigate();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <NavLink className='navbar-brand' to='/'>Calories Tracker</NavLink>
            <button className='btn btn-dark' onClick={()=> navigation('/add')}>Add Meal</button>
            </nav>
        </div>
    );
};

export default NavBar;