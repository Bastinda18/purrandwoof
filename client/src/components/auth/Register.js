import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';

import PropTypes from 'prop-types';

const Register = ({setAlert, register, isAuthenticated}) => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({name, email, password});
		}
	};
	//Redirect if logged in
	if(isAuthenticated){
		return <Redirect to='/dashboard'/>
	}

	return (
		<section className='auth'>
			<div className='container '>
				<div className='row d-flex  align-items-center justify-content-md-center'>
					<div className='col-md-8 col-lg-6 bg-white rounded shadow '>
						<h3 className='text-danger my-4 text-center'>Register</h3>

						<form onSubmit={(e) => onSubmit(e)}>
							<div className='form-group'>
								<label htmlFor='userName'>User Name</label>
								<input
									className='form-control'
									id='userName'
									placeholder='Name'
									type='text'
									name='name'
									value={name}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='InputEmail'>Email address</label>
								<input
									className='form-control'
									id='InputEmail'
									type='email'
									placeholder='Email Address'
									name='email'
									value={email}
									onChange={(e) => onChange(e)}
									required
								/>
								<small id='passwordHelpBlock' className='form-text text-muted'>
									Your password must be 6-20 characters long.
								</small>
							</div>
							<div className='form-group'>
								<label htmlFor='inputPassword1'>Password</label>
								<input
									className='form-control'
									id='inputPassword1'
									type='password'
									placeholder='Password'
									name='password'
									value={password}
									onChange={(e) => onChange(e)}
									minLength='6'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='inputPassword2'>Confirm Password</label>
								<input
									className='form-control'
									id='inputPassword2'
									type='password'
									placeholder='Confirm Password'
									name='password2'
									value={password2}
									onChange={(e) => onChange(e)}
									minLength='6'
								/>
							</div>

							<button type='submit' className='btn btn-danger text-white px-5 my-2'>
								Submit
							</button>
							<small id='passwordHelpBlock' className='form-text text-muted mb-5'>
								Already have an account? <Link to='/login'>Sign In</Link>
							</small>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   register: PropTypes.func.isRequired, 
   isAuthenticated: PropTypes.bool
}
const mapStateToProps=(state)=>({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register);
