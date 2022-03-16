import {
	FETCH_MEMBERS,
	MEMBER_TASK_FAIL,
	MEMBER_TASK_LOADING,
	MEMBER_TASK_SUCCESS,
} from "./member.types";

const INITIAL_STATE = {
	loading: false,
	list: [],
};

const reducer = (
	state = INITIAL_STATE,
	action: { type: string; payload?: any }
) => {
	switch (action.type) {
		case FETCH_MEMBERS:
			return {
				...state,
				list: action.payload,
			};

		case MEMBER_TASK_LOADING:
			return {
				...state,
				loading: true,
			};

		case MEMBER_TASK_SUCCESS:
		case MEMBER_TASK_FAIL:
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};

export default reducer;
