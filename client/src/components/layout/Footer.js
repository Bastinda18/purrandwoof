import React from 'react';
import {Logo} from "./Logo";
import {Link} from 'react-router-dom';
import facebook from '../../images/icons/facebook.png';
import insta from '../../images/icons/insta.png';
import twitter from '../../images/icons/twitter.png';


const Footer = () => {
    return (
        <footer className="bg-dark text-white">
    <div className="container text-center py-5">
        <div className="row">
            <div className="col-md-4">
                <Link to="/" >
                    <Logo viewBox="0 0 93.95 57" />
            </Link>
            </div>
            <div className="col-md-4 mt-3">
                <p  className="lead">All rights reserve. Copy Right Maria Zebroff</p>
                <p className="lead">Address: 2908 27th Ave, Vernon BC, 1TY VT0</p>
                <a href="#"><img src={facebook} alt="facebook" width="40px"/ ></a>
                <a href="#" className="mx-3"><img src={twitter} alt="twitter" width="40px"/ ></a>
                <a href="#"><img src={insta} alt="instagram" width="40px"/ ></a>
            </div>
        </div>


    </div>

</footer>

    )
}

export default Footer;