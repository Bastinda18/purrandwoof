import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth'

const Login = ({login, isAuthenticated}) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();

		login(email,password);
	};

	//Redirect if logged in
	if(isAuthenticated){
		return <Redirect to='/dashboard'/>
	}

	return (
		<section className='auth'>
			<div className='container pt-5'>
				<div className='row d-flex  align-items-center justify-content-md-center'>
					<div className='col-md-8 col-lg-6 bg-white rounded shadow '>
						<h3 className='text-danger my-4 text-center'>Login</h3>

						<form onSubmit={(e) => onSubmit(e)}>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>Email address</label>
								<input
									className='form-control'
									id='exampleInputEmail1'
									type='email'
									placeholder='Email Address'
									name='email'
									value={email}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='inputPassword'>Password</label>
								<input
									className='form-control'
									id='inputPassword'
									type='password'
									placeholder='Password'
									name='password'
									value={password}
									onChange={(e) => onChange(e)}
									minLength='6'
								/>
							</div>

							<button type='submit' className='btn btn-danger text-white px-5 my-2'>
								Login
							</button>
							<small id='passwordHelpBlock' className='form-text text-muted mb-5'>
								Don't have an account? <Link to='/register'>Sign Up</Link>
							</small>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}
const mapStateToProps=(state)=>({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);
