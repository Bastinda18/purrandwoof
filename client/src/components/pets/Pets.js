import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PetCard from './PetCard';
import { connect } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { getAllPets } from '../../actions/pet';

const Pets = ({ getAllPets, pet: { allPets, loading } }) => {
	useEffect(
		() => {
			getAllPets();
		},
		[ getAllPets ]
	);

	return loading ? (
		<Spinner />
	) : (
		<section id='all-pets'>
			<h1 className='text-danger text-center mt-4'>Our Pets</h1>
			<div className='container d-flex  flex-wrap justify-content-center justify-content-md-around py-4'>
				{allPets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
			</div>
		</section>
	);
};

Pets.propTypes = {
	getAllPets: PropTypes.func.isRequired,
	pet: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	pet: state.pet
});

export default connect(mapStateToProps, { getAllPets })(Pets);
