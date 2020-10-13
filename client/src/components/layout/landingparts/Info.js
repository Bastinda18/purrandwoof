import React from 'react';
import {Link} from 'react-router-dom';
import paw from '../../../images/icons/paw.png'
import search from '../../../images/icons/search.png'
import cage from '../../../images/icons/cage.png'
import men from '../../../images/men.jpg'


const Info = () => {
    return (
        <section id="info" >
    <div className="container text-center ">
        <h3 className="text-danger mb-5 mt-5">Adopt yor best friend today</h3>
        <div className="row">
            <div className="col-md-4">
                <div className="pt-4 mb-3 image-container d-none d-sm-block">
                <img className="img-fluid" src={search} alt="search" width="100px"/>
                 </div>
                <h4 >Search</h4>
                <p className="lead">Lorem ipsum dolor sit amet distinctio eaque alias ab tempore quam provident dignissimos iusto.</p>
            </div>
            <div className="col-md-4">
                <div className="pt-4  mb-3 image-container d-none d-sm-block">
                    <img className="img-fluid" src={paw} alt="paw" width="105px"/>
                     </div>
                <h4 >Meet</h4>
                <p className="lead">Lorem ipsum dolor. Cupiditate distinctio eaque alias officiis in ab tempore quam provident dignissimos iusto.</p>
            </div>
            <div className="col-md-4">
                <div className="pt-4 mb-3 image-container d-none d-sm-block">
                    <img className="img-fluid" src={cage} alt="cage" width="105px"/>
                     </div>
                <h4 >Adopt</h4>
                <p className="lead">Lorem ipsum dolor sit. Cupiditate distinctio eaque alias officiis in ab tempore quam provident dignissimos.</p>
            </div>
        </div>
        <a href="#" className="btn btn-lg btn-danger text-white px-4 mt-5">See All Pets</a>
        <div id="quote" className="row p-4 my-4">
            <div className="col-md-4 d-none d-md-block">
                <img className="img-fluid" src={men} alt="a men and a dog" width="440px"/>
            </div>
            <div className="col-md-8">
                <i className="fas fa-quote-right fa-2x text-info my-2"></i>
                <blockquote className="blockquote">
                    <p className="mb-0 ">Dogs are not our whole lives</p>
                    <p className="mb-0 ">But they make our lives whole</p>
                    <footer className="blockquote-footer">Roger Caras</footer>
                </blockquote>
            </div>

        </div>
    </div>
  

</section>
    )
}

export default Info;