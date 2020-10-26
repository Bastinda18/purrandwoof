import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createPet } from '../../actions/pet';

function CreatePet({ createPet, history }) {
	const [ formData, setFormData ] = useState({
		name: '',
		type: '',
		age: '',
		gender: '',
		breed: '',
		color: '',
		description: '',
		image: null
	});

	const { name, type, age, gender, breed, color, description, image } = formData;

	const onChange = (e) => {
		const target = e.target;

		const value = target.type === 'file' ? target.files[0] : target.value;

		const name = target.name;

		setFormData({ ...formData, [name]: value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();

		createPet(formData, history);
	};
	return (
		<section className='auth'>
			<div className='container pt-5'>
				<div className='row d-flex  align-items-center justify-content-md-center'>
					<div className='col-md-8 col-lg-6 bg-white rounded shadow '>
						<h3 className='text-danger my-4 text-center'>Pet Profile</h3>

						<form onSubmit={(e) => onSubmit(e)}>
							<div className='form-group'>
								<label htmlFor='petName'>
									Name <small className='text-info'>(Required)</small>
								</label>
								<input
									type='text'
									className='form-control'
									id='petName'
									name='name'
									value={name}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>

							<div className='form-row'>
								<div className='col-sm'>
									<label htmlFor='type'>
										Type <small className='text-info'>(Required)</small>
									</label>
									<input
										type='text'
										className='form-control'
										placeholder='Dog'
										id='type'
										name='type'
										value={type}
										onChange={(e) => onChange(e)}
										required
									/>
								</div>
								<div className='col-sm'>
									<label htmlFor='age'>Age</label>
									<input
										type='text'
										className='form-control'
										id='age'
										name='age'
										value={age}
										onChange={(e) => onChange(e)}
									/>
								</div>
								<div className='col-sm'>
									<label htmlFor='gender'>Gender</label>
									<select
										id='gender'
										className='form-control'
										name='gender'
										value={gender}
										onChange={(e) => onChange(e)}
									>
										<option value='' />
										<option value='Male'>Male</option>
										<option value='Female'>Female</option>
									</select>
								</div>
							</div>

							<div className='form-row mt-3'>
								<div className='col-sm'>
									<label htmlFor='breed'>Breed </label>
									<input
										type='text'
										className='form-control'
										id='breed'
										name='breed'
										value={breed}
										onChange={(e) => onChange(e)}
									/>
								</div>
								<div className='col-sm'>
									<label htmlFor='color'>Color</label>
									<input
										type='text'
										className='form-control'
										id='color'
										name='color'
										value={color}
										onChange={(e) => onChange(e)}
									/>
								</div>
							</div>
							<div className='my-3'>
								<label htmlFor='textDescription'>Description</label>
								<textarea
									className='form-control'
									id='textDescription'
									name='description'
									value={description}
									onChange={(e) => onChange(e)}
								/>
							</div>
							<p>
								<small className='text-info'>
									{' '}
									Add a picture of your pet. File must be JPG or PNG format and no
									more than 150Kb.{' '}
								</small>
							</p>
							<div className='custom-file'>
								<input
									type='file'
									className='custom-file-input'
									id='customFile'
									name='image'
									onChange={(e) => onChange(e)}
								/>
								<label className='custom-file-label' htmlFor='customFile'>
									{image ? image.name : 'Choose file'}
								</label>
							</div>

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
}

CreatePet.propTypes = {
	createPet: PropTypes.func.isRequired
};

export default connect(null, { createPet })(withRouter(CreatePet));
