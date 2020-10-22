import axios from 'axios';
import { setAlert } from './alert';
import { getUsersProfileById } from './profile';
import {
	GET_PET,
	PET_PROFILE_ERROR,
	GET_MY_PET,
	UPDATE_PET_LIST,
	GET_ALL_PETS,
	UPDATE_LIKES,
	ADD_COMMENT,
	REMOVE_COMMENT
} from './types';

//Get All Pets

export const getAllPets = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/pets');
		dispatch({
			type: GET_ALL_PETS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PET_PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//Create or Update a pet

export const createPet = (formData, history, edit = false) => async (dispatch) => {
	//if No Picture
	if (formData.image === null) {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};
			const res = await axios.post('/api/pets', formData, config);
			dispatch({
				type: GET_PET,
				payload: res.data
			});

			dispatch(setAlert(edit ? "Pet's Profile Updated" : "Pet's Profile Created", 'success'));
			if (!edit) {
				history.push('/dashboard');
			}
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}
			dispatch({
				type: PET_PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
		return;
	}
	//if there is a picture

	if (formData.image.size > 150000) {
		dispatch(setAlert('File is too large', 'danger'));
		return;
	}
	if (
		!(formData.image.type === 'image/png') &&
		!(formData.image.type === 'image/jpeg') &&
		!(formData.image.type === 'image/jpg')
	) {
		dispatch(setAlert('File must have .jpg or .png format', 'danger'));
		return;
	}
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post('/api/pets', formData, config);

		const petID = res.data._id;

		try {
			const fd = new FormData();
			console.log('image', formData.image);
			fd.append('image', formData.image, formData.image.name);

			const respic = await axios.post(`api/pets/${petID}/picture`, fd);
		} catch (err) {
			const errors = err.response.data.msg;

			if (errors) {
				dispatch(setAlert(errors, 'danger'));
			}
			dispatch({
				type: PET_PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}

		dispatch({
			type: GET_PET,
			payload: res.data
		});

		dispatch(setAlert(edit ? "Pet's Profile Updated" : "Pet's Profile Created", 'success'));
		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PET_PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//List users pet

export const getUsersPet = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/pets/me');

		dispatch({
			type: GET_MY_PET,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PET_PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Delete Pet

export const deletePet = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/pets/${id}`);

		dispatch({
			type: UPDATE_PET_LIST,
			payload: res.data
		});

		dispatch(setAlert('Pet Removed', 'success'));
	} catch (err) {
		dispatch({
			type: PET_PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//Add like

export const addLike = (petId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/pets/like/${petId}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id: petId, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: PET_PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//REMOVE like

export const removeLike = (petId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/pets/unlike/${petId}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id: petId, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: PET_PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//Get Pets Profile

export const getPetProfile = (petId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/pets/${petId}`);
		const userId = res.data.user;
		dispatch({
			type: GET_PET,
			payload: res.data
		});
		dispatch(getUsersProfileById(userId));
	} catch (err) {
		dispatch({
			type: PET_PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//Add comment

export const addComment = (petId, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		const res = await axios.post(`/api/pets/comment/${petId}`, formData, config);
		dispatch({
			type: ADD_COMMENT,
			payload: res.data
		});
		dispatch(setAlert('Comment Added', 'success'));
	} catch (err) {
		dispatch({
			type: PET_PROFILE_ERROR
		});
	}
};

//Delete comment

export const deleteComment = (petId, commentId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/pets/comment/${petId}/${commentId}`);
		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId
		});
		dispatch(setAlert('Comment Removed', 'danger'));
	} catch (err) {
		dispatch({
			type: PET_PROFILE_ERROR
		});
	}
};
