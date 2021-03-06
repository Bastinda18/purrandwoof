import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePet } from '../../actions/pet';

const MyPets = ({ pets, deletePet }) => {
	const petsList = pets.map((pet) => (
		<tr key={pet._id}>
			<th scope='row'>
				<Link to={`/pet/${pet._id}`}>{pet.name}</Link>
			</th>
			<td>{pet.type}</td>
			<td>{pet.age !== undefined ? pet.age : '-'}</td>
			<td>
				<Moment format='YYYY/MM/DD'>{pet.data}</Moment>
			</td>
			<td className='text-center'>
				<button
					className='btn btn-danger py-1 px-2 text-white'
					onClick={() => deletePet(pet._id)}
				>
					<i className='fa fa-trash-alt' aria-hidden='true' />
				</button>
			</td>
		</tr>
	));
	return (
		<Fragment>
			<p className='text-info mt-3 mb-3 '>Pets listed by me:</p>

			<table className='table mb-5'>
				<thead className='thead-light'>
					<tr>
						<th scope='col'>Name</th>
						<th scope='col'>Type</th>
						<th scope='col'>Age</th>
						<th scope='col'>Date</th>
						<th scope='col' className='text-center'>
							Action
						</th>
					</tr>
				</thead>
				<tbody>{petsList}</tbody>
			</table>
		</Fragment>
	);
};

MyPets.propTypes = {
	pets: PropTypes.array.isRequired,
	deletePet: PropTypes.func.isRequired
};

export default connect(null, { deletePet })(MyPets);
