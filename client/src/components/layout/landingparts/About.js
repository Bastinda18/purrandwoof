import React from 'react';
import girl from '../../../images/girl.png';
import { Link } from 'react-router-dom';
import { Wave } from './Wave';

const About = () => {
	return (
		<section id='about'>
			<div className='container text-center py-5'>
				<div className='row d-flex justify-content-center align-items-center '>
					<div className='col-md-6'>
						<div className='pt-4 mb-3 d-none d-md-block'>
							<img
								className='img-fluid'
								src={girl}
								alt='a girl with a dog'
								width='1098px'
							/>
						</div>
					</div>
					<div className='col-md-6 '>
						<h2>Found a pet who needs a home?</h2>
						<h2>Join today and add its profile</h2>
						<p className='lead text-danger my-5'>
							Rescue is not just a verb for us. It is a promise.
						</p>
						<Link to='/register' className='btn  btn-md btn-secondary text-white px-4 '>
							Join Now
						</Link>
					</div>
				</div>
			</div>

			<Wave />
		</section>
	);
};

export default About;
