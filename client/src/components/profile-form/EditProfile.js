import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
	history
}) => {
	const [ formData, setFormData ] = useState({
		location: '',
		finder: '',
		adopter: '',
		company: '',
		facebook: '',
		twitter: '',
		instagram: ''
	});

	const [ displaySocialInputs, toggleSocialInputs ] = useState(false);

	useEffect(
		() => {
			getCurrentProfile();

			setFormData({
				location: loading || !profile.location ? '' : profile.location,

				finder: loading || !profile.finder ? '' : profile.finder,
				adopter: loading || !profile.adopter ? '' : profile.adopter,
				company: loading || !profile.company ? '' : profile.company,

				facebook: loading || !profile.social ? '' : profile.social.facebook,
				twitter: loading || !profile.social ? '' : profile.social.twitter,
				instagram: loading || !profile.social ? '' : profile.social.instagram
			});
		},
		[ loading ]
	);

	const { location, facebook, twitter, instagram } = formData;

	const onChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		setFormData({ ...formData, [name]: value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();

		createProfile(formData, history, true);
	};

	return (
		<section className='auth'>
			<div className='container pt-4'>
				<div className='row d-flex  align-items-center justify-content-md-center'>
					<div className='col-md-8 col-lg-6 bg-white rounded shadow '>
						<h3 className='text-danger my-4 text-center'>User Profile</h3>

						<form onSubmit={(e) => onSubmit(e)}>
							<div className='form-group'>
								<label htmlFor='userLocation'>Location</label>
								<input
									type='text'
									className='form-control'
									id='userLocation'
									name='location'
									value={location}
									onChange={(e) => onChange(e)}
								/>
							</div>
							<p className='form-text text-info mb-2'>Choose you role:</p>
							<div className='form-check-inline form-check'>
								<input
									type='checkbox'
									className='form-check-input'
									id='exampleCheck1'
									name='finder'
									value={formData.finder}
									checked={formData.finder}
									onChange={(e) => onChange(e)}
								/>
								<label className='form-check-label' htmlFor='exampleCheck1'>
									Pet Finder
								</label>
							</div>
							<div className='form-check-inline form-check'>
								<input
									type='checkbox'
									className='form-check-input'
									id='exampleCheck1'
									name='adopter'
									value={formData.adopter}
									checked={formData.adopter}
									onChange={(e) => onChange(e)}
								/>
								<label className='form-check-label' htmlFor='exampleCheck1'>
									Adopter
								</label>
							</div>
							<div className='form-check-inline form-check'>
								<input
									type='checkbox'
									className='form-check-input'
									id='exampleCheck1'
									name='company'
									value={formData.company}
									checked={formData.company}
									onChange={(e) => onChange(e)}
								/>
								<label className='form-check-label' htmlFor='exampleCheck1'>
									Pet Rescue Organization
								</label>
							</div>

							<div>
								<button
									onClick={() => toggleSocialInputs(!displaySocialInputs)}
									className='btn btn-outline-info px-2 my-3 btn-sm'
									type='button'
								>
									Add your social media
								</button>{' '}
								<span>  (Optional)</span>
							</div>

							{displaySocialInputs && (
								<div>
									<div className='form-group my-0 my-1'>
										<label htmlFor='userFacebook'>Facebook:</label>
										<input
											type='text'
											className='form-control'
											id='userFacebook'
											name='facebook'
											value={facebook}
											onChange={(e) => onChange(e)}
										/>
									</div>
									<div className='form-group my-0 my-1'>
										<label htmlFor='userTwitter'>Twitter:</label>
										<input
											type='text'
											className='form-control'
											id='userTwitter'
											name='twitter'
											value={twitter}
											onChange={(e) => onChange(e)}
										/>
									</div>
									<div className='form-group my-0 my-1'>
										<label htmlFor='userInstagram'>Instagram:</label>
										<input
											type='text'
											className='form-control'
											id='userInstagram'
											name='instagram'
											value={instagram}
											onChange={(e) => onChange(e)}
										/>
									</div>
								</div>
							)}
							<button type='submit' className='btn btn-danger text-white px-5 my-4'>
								Submit
							</button>
							<Link to='/dashboard' className='btn btn-primary text-white px-4 ml-3'>
								Go Back
							</Link>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(EditProfile)
);
