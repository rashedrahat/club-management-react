import {
	CLUB_TASK_FAIL,
	CLUB_TASK_LOADING,
	CLUB_TASK_SUCCESS,
	FETCH_ALL_CLUBS,
} from "./club.types";

const INITIAL_STATE = {
	loading: false,
	list: [],
};

const reducer = (
	state = INITIAL_STATE,
	action: { type: string; payload?: any }
) => {
	switch (action.type) {
		case FETCH_ALL_CLUBS:
			return {
				...state,
				list: action.payload,
			};

		case CLUB_TASK_LOADING:
			return {
				...state,
				loading: true,
			};

		case CLUB_TASK_SUCCESS:
		case CLUB_TASK_FAIL:
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};

export default reducer;
