import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyPets from './MyPets';
import { connect } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getUsersPet } from '../../actions/pet';

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	getUsersPet,
	myPets,
	auth: { user, avatar },
	profile: { profile, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);
	useEffect(() => {
		getUsersPet();
	}, []);

	console.log(myPets);
	return loading && profile === null ? (
		<Spinner />
	) : (
		<section id='profiles'>
			<div className='container my-5'>
				<div className='row d-flex  align-items-center justify-content-md-center'>
					<div className='col-md-8 bg-white rounded shadow wrapper '>
						<div
							id='paw-bg'
							className='row d-flex  align-items-center justify-content-md-center user-profile'
						>
							<div className='col mt-3'>
								<img
									src={user.avatar}
									className='mx-auto d-block '
									alt='user'
									width='150px'
									height='150px'
								/>
							</div>
						</div>

						<Link
							to={profile === null ? '/create-profile' : '/edit-profile'}
							className='btn btn-danger text-white my-4 px-4 mx-3'
						>
							{profile === null ? 'Add a Profile' : 'Edit Profile'}
						</Link>
						<Link to='/create-pet' className='btn btn-primary text-white my-4 px-4 '>
							Add a Pet
						</Link>

						<h3 className='text-dark my-1 '>Welcome {user && user.name}</h3>

						{profile !== null ? (
							<Fragment>
								<h3 className='text-info my-1 '>{profile.location}</h3>
							</Fragment>
						) : (
							''
						)}

						<MyPets pets={myPets} />
						<button
							onClick={() => deleteAccount()}
							className='btn btn-info text-white mt-1  mb-4 px-2 '
						>
							Delete My Account
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	getUsersPet: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	myPets: state.pet.myPets
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, getUsersPet })(
	Dashboard
);
