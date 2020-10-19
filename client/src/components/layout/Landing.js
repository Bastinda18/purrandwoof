import React, {Fragment} from 'react';
import Home from './landingparts/Home';
import About from './landingparts/About';
import Info from './landingparts/Info';
import Footer from './Footer';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const Landing = ({isAuthenticated}) => {
    if(isAuthenticated) {
return <Redirect to='/dashboard' />;
    }
    return (
    <Fragment>
<Home/>
<About/>
<Info/>
<Footer/>
        </Fragment>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps=state=>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
