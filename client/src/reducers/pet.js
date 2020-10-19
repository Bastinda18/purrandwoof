import {
	GET_PET,
	PET_PROFILE_ERROR,
	GET_MY_PET,
	UPDATE_PET_LIST,
	GET_ALL_PETS
} from '../actions/types';

const initialState = {
	pet: null,
	myPets: [],
	allPets: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PET:
			return {
				...state,
				pet: payload,
				loading: false
			};
		case GET_MY_PET:
		case UPDATE_PET_LIST:
			return {
				...state,
				myPets: payload,
				loading: false
			};
		case GET_ALL_PETS:
			return {
				...state,
				allPets: payload,
				loading: false
			};
		case PET_PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};

		default:
			return state;
	}
}
