import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../../actions/pet';

function CommentForm({ petId, addComment }) {
	const [ text, setText ] = useState('');

	return (
		<div className='mt-2'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addComment(petId, { text });
					setText('');
				}}
			>
				<div className='form-group px-5'>
					<textarea
						className='form-control'
						rows='5'
						cols='30'
						placeholder='Leave a Comment'
						value={text}
						required
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<div className='d-flex flex-row-reverse px-5'>
					<button className='btn btn-danger text-white  px-5 '>Send</button>
					<Link to='/all-pets' className='btn btn-dark text-white px-4 mx-2'>
						All Pets
					</Link>
				</div>
			</form>
		</div>
	);
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	petId: PropTypes.string.isRequired
};

export default connect(null, { addComment })(CommentForm);
