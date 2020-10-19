import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import { Link } from 'react-router-dom';

const PetCard = ({ pet }) => {
	return (
		<div className='card shadow mb-3' style={{ width: '20rem' }}>
			<Image id={pet._id} name={pet.name} />

			<div className='card-body'>
				<h5 className='card-title text-center text-info display-4'>{pet.name}</h5>
				<Link
					to={`/pet/discustion/${pet._id}`}
					className='btn btn-info btn-sm text-white px-3 mr-2 d-block d-sm-inline '
				>
					Comments {pet.comments.length > 0 && pet.comments.length}
				</Link>
				<Link
					to={`/pet/${pet._id}`}
					className='btn btn-primary btn-sm text-white px-4 mr-2 d-block d-sm-inline my-2'
				>
					Profile
				</Link>
				<p className='d-block d-sm-inline text-info text-center '>
					<i className='fa fa-heart text-danger' aria-hidden='true' /> {pet.likes.length}
				</p>
			</div>
		</div>
	);
};

PetCard.propTypes = {
	pet: PropTypes.object.isRequired
};

export default PetCard;
