import {
	GET_PET,
	PET_PROFILE_ERROR,
	GET_MY_PET,
	UPDATE_PET_LIST,
	GET_ALL_PETS,
	UPDATE_LIKES,
	CLEAR_MY_PETS,
	ADD_COMMENT,
	REMOVE_COMMENT
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
		case CLEAR_MY_PETS:
			return {
				...state,
				myPets: [],
				loading: false
			};
		case PET_PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};

		case UPDATE_LIKES:
			return {
				...state,
				allPets: state.allPets.map(
					(pet) => (pet._id === payload.id ? { ...pet, likes: payload.likes } : pet)
				),
				loading: false
			};
		case ADD_COMMENT:
			return {
				...state,
				pet: { ...state.pet, comments: payload },
				loading: false
			};
		case REMOVE_COMMENT:
			return {
				...state,
				pet: {
					...state.pet,
					comments: state.pet.comments.filter((comment) => comment._id !== payload),
					loading: false
				}
			};

		default:
			return state;
	}
}
