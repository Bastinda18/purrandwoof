import React, {Fragment} from 'react';
import {Logo} from "./Logo";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth';


const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {

    const authLinks=(
        <ul className="navbar-nav ml-auto">
           
            <li className="nav-item">
                <Link to="/dashboard" className="nav-link text-primary">Dashboard </Link>
            </li>
            <li className="nav-item">
                <Link to="!#" className="nav-link"><i className="fa fa-paw" aria-hidden="true"></i>{' '} All Pets </Link>
            </li>
            <li className="nav-item">
    <a onClick={logout} href="#!" class="nav-link"><i className="fas fa-sign-out-alt"></i>{' '} Logout </a>
            </li>
        </ul>

    );
    const guestLinks=(
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to="/login" className="nav-link"><i className="fa fa-paw" aria-hidden="true"></i> {' '} All Pets </Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="nav-link">Sign Up </Link>
            </li>
            <li className="nav-item">
                <Link to="/login" class="nav-link">Login </Link>
            </li>
        </ul>
        
        );
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" >
    <Link to="/" className="navbar-brand"><Logo/></Link>
    <button className="navbar-toggler" data-toggle="collapse" data-target="#mainNavbar">
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id='mainNavbar'>
    {!loading && (<Fragment>{isAuthenticated? authLinks : guestLinks}</Fragment>)}
    </div>

</nav>
    )
}

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
}
const mapStateToProps=(state)=>({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);