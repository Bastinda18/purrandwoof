import React from 'react';

import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/pet';

function CommentItem({
	petId,
	comment: { _id, text, name, avatar, user, date },
	auth,
	deleteComment
}) {
	return (
		<div className='row my-1 py-2 px-5'>
			<div
				className='col-sm-2 pl-3 py-2 comment-avatar d-flex  align-items-center justify-content-center'
				style={{
					backgroundColor:
						!auth.loading && user === auth.user._id
							? 'rgba(168, 223, 231, 0.2)'
							: 'rgba(243, 243, 243, 0.6)'
				}}
			>
				<div>
					<img
						src={avatar}
						alt='user avatar'
						width='70px'
						className='d-none d-sm-block'
						style={{ borderRadius: '50%' }}
					/>
					<p className='text-dark text-center p-0 m-0' style={{ fontWeight: '700' }}>
						{name}
					</p>
				</div>
			</div>
			<div
				className='col-sm-10 pl-3 py-2 '
				style={{
					backgroundColor:
						!auth.loading && user === auth.user._id
							? 'rgba(168, 223, 231, 0.2)'
							: 'rgba(243, 243, 243, 0.6)'
				}}
			>
				<p className='text-info'>
					Posted on: <Moment format='YYYY/MM/DD'>{date}</Moment>
				</p>
				<p>{text}</p>
				{!auth.loading &&
				user === auth.user._id && (
					<div className='d-flex flex-row-reverse'>
						<button
							onClick={(e) => deleteComment(petId, _id)}
							type='button'
							className='btn btn-danger text-white'
						>
							<i className='fa fa-trash' aria-hidden='true' />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

CommentItem.propTypes = {
	deleteComment: PropTypes.func.isRequired,
	petId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
