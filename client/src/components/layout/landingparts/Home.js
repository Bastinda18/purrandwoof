import React from 'react';
import dog from '../../../images/dog.png'
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <section id="showcase" className="d-flex justify-content-center align-items-center ">
    <div id="dogBackground" className="d-none d-xl-block"><img src={dog} alt="black dog" width="500px" height="450px"/></div>
    <div id="header " className="container text-center">
        <h1 className="display-4 text-center">Purr<span className='amper'> & </span><span className="text-white"> Woof</span></h1>
        <h2 className='display-5 mt-2 mb-4'>Find Your Furry Friend</h2>

        <div id="button-container" className="d-flex justify-content-around align-items-center flex-wrap ">
        <Link to="/register" className="btn btn-md btn-dark px-3 my-1">Sign Up</Link>
        <Link to="/login" className="btn  btn-md btn-secondary text-white px-4 my-1">Login</Link>
        </div>
    </div>

</section>
    )
}

export default Home;