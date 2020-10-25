import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import Image from './Image';
import petsAge from '../../utils/petsAge';
import { getPetProfile } from '../../actions/pet';

const PetProfile = ({ getPetProfile, pet: { pet, loading }, profile: { profile }, match }) => {
	useEffect(
		() => {
			getPetProfile(match.params.id);
		},
		[ getPetProfile, match.params.id ]
	);

	return loading || pet === null || profile === null ? (
		<Spinner />
	) : (
		<section id='profiles'>
			<div className='container mt-5'>
				<div className='row d-flex  align-items-center justify-content-md-center'>
					<div className='col-md-8 bg-white rounded shadow wrapper '>
						<div
							id='paw-bg'
							className='row d-flex  align-items-center justify-content-md-center'
						>
							<div className='col mt-3'>
								<Image id={pet._id} name={pet.name} myclass={'mx-auto d-block'} />
							</div>
						</div>

						<h3 className='text-dark my-1 text-center'>{pet.name}</h3>
						<p className='lead text-info text-center my-0'>{petsAge(pet.age)} </p>
						<p className='lead text-info text-center mt-1 mb-3 finder'>
							Finder: {profile.user.name}
						</p>

						<table className='table pb-0 mb-0'>
							<tbody>
								<tr>
									<th scope='row '>Breed</th>
									<td>{pet.breed}</td>
								</tr>
								<tr>
									<th scope='row'>Gender</th>
									<td>{pet.gender}</td>
								</tr>
								<tr>
									<th scope='row'>Color</th>
									<td>{pet.color}</td>
								</tr>
								<tr>
									<th scope='row'>Location</th>
									<td>{profile.location ? profile.location : ''}</td>
								</tr>
								<tr>
									<th scope='row'>Other Details</th>
									<td>{pet.description}</td>
								</tr>
							</tbody>
						</table>
						<div className='buttons-set mt-0 pt-3 mb-3'>
							<Link
								to={`/pet/discussion/${pet._id}`}
								className='btn btn-danger text-white my-4 px-4 mx-3'
							>
								Contact
							</Link>
							<Link to='/all-pets' className='btn btn-dark text-white my-4 px-4 '>
								Go To All Pets
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

PetProfile.propTypes = {
	getPetProfile: PropTypes.func.isRequired,

	pet: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	pet: state.pet,
	profile: state.profile
});

export default connect(mapStateToProps, { getPetProfile })(PetProfile);
