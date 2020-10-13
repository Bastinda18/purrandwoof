import React, {Fragment} from 'react';
import Home from './landingparts/Home';
import About from './landingparts/About';
import Info from './landingparts/Info';
import Footer from './Footer';

const Landing = () => {
    return (
    <Fragment>
<Home/>
<About/>
<Info/>
<Footer/>
        </Fragment>
    )
}

export default Landing;
