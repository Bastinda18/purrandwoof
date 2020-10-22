import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import Image from './Image';
import { getPetProfile } from '../../actions/pet';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const PetDiscussion = ({ getPetProfile, pet: { pet, loading }, profile: { profile }, match }) => {
	useEffect(
		() => {
			getPetProfile(match.params.id);
		},
		[ getPetProfile ]
	);
	return loading || pet === null || profile === null ? (
		<Spinner />
	) : (
		<section id='comments'>
			<div className='container my-5'>
				<div className='row d-flex  align-items-center justify-content-md-center'>
					<div className='col-md-10 col-lg-8 bg-white rounded shadow wrapper pb-3'>
						<div className='row py-3  comment-header '>
							<div className='col-3 col-lg-2 comment-avatar'>
								<Image id={pet._id} name={pet.name} width={'100px'} />
							</div>
							<div className='col-9 col-lg-10 '>
								<h3 className='text-primary pt-3'>
									<Link to={`/pet/${pet._id}`}>{pet.name}</Link>
								</h3>
								<p className='lead text-info my-0'>Finder: {profile.user.name}</p>
							</div>
						</div>
						{pet.comments.map((comment) => (
							<CommentItem key={comment._id} comment={comment} petId={pet._id} />
						))}
						<CommentForm petId={pet._id} />
					</div>
				</div>
			</div>
		</section>
	);
};

PetDiscussion.propTypes = {
	getPetProfile: PropTypes.func.isRequired,
	pet: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	pet: state.pet,
	profile: state.profile
});

export default connect(mapStateToProps, { getPetProfile })(PetDiscussion);
