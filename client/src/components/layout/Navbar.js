import React from 'react';
import {Logo} from "./Logo";
import {Link} from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" >
    <Link to="/" className="navbar-brand"><Logo/></Link>
    <button className="navbar-toggler" data-toggle="collapse" data-target="#mainNavbar">
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id='mainNavbar'>
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to="#" className="nav-link"><i className="fa fa-paw" aria-hidden="true"></i> All Pets </Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="nav-link">Sign Up </Link>
            </li>
            <li className="nav-item">
                <Link to="/login" class="nav-link"> Login </Link>
            </li>
        </ul>
    </div>

</nav>
    )
}

export default Navbar;