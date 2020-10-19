import React, { useState } from 'react';
import { Logo } from '../layout/Logo';
import PropTypes from 'prop-types';
import avatar from '../../images/avatar.png';

const Image = ({ id, name, width = '150px' }) => {
	const [ error, setError ] = useState(false);
	let src = `api/pets/${id}/picture`;

	if (error) {
		src = avatar;
	}

	return (
		<img
			src={src}
			onError={() => setError(true)}
			className='card-img-top'
			alt={name}
			width={width}
		/>
	);
};

Image.propTypes = {
	id: PropTypes.string.isRequired
};

export default Image;
