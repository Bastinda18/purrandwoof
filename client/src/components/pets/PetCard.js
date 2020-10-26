import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/pet';

const PetCard = ({ pet, addLike, removeLike, auth, allPets }) => {
	const currentPet = allPets.filter((curpet) => curpet._id === pet._id);

	const isUserLiked =
		currentPet[0].likes.filter((like) => like.user === auth.user._id).length > 0;

	const [ isLiked, setLike ] = useState(isUserLiked);

	const likePet = (id) => {
		isLiked ? removeLike(id) : addLike(id);
		setLike(!isLiked);
	};

	return (
		<div className='card shadow mb-3' style={{ width: '20rem' }}>
			<Image id={pet._id} name={pet.name} myclass={'card-img-top'} />

			

			<div className='card-body pt-1'>
			<p className='d-inline text-info text-center'
				style={{ fontSize: '1.5rem' }}
					onClick={(e) => likePet(pet._id)}>
				
					<i style={{ fontSize: '1.5rem' }}
						className={isLiked ? 'fa fa-heart text-danger' : 'fa fa-heart text-info'}
						aria-hidden='true'
					/>{' '}
					{pet.likes.length}
			</p>

			
			<div className='d-flex justify-content-around align-items-center'>
				<h5 className='card-title text-center text-info display-4 d-inline'>{pet.name}</h5> 

			</div>
					<div className='d-flex justify-content-around align-items-center'>
				<Link
					to={`/pet/discussion/${pet._id}`}
					className='btn btn-info btn-sm text-white px-3  d-block d-sm-inline '
				>
					Comments {pet.comments.length > 0 && pet.comments.length}
				</Link>
				<Link
					to={`/pet/${pet._id}`}
					className='btn btn-primary btn-sm text-white px-4 d-block d-sm-inline my-2'
				>
					Profile
				</Link>
				</div>
			
			</div>
		</div>
	);
};

PetCard.propTypes = {
	auth: PropTypes.object.isRequired,
	allPets: PropTypes.array.isRequired,
	pet: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	allPets: state.pet.allPets
});

export default connect(mapStateToProps, { addLike, removeLike })(PetCard);
