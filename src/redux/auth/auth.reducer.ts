import {
	LOG_IN,
	LOG_OUT,
	SET_LOGIN_CRED,
	AUTH_TASK_LOADING,
	AUTH_TASK_SUCCESS,
	AUTH_TASK_FAIL,
} from "./auth.types";

const INITIAL_STATE = {
	loading: false,
	isLoggedIn: false,
	me: null,
};

const reducer = (
	state = INITIAL_STATE,
	action: { type: string; payload?: { userName: string; name: string } }
) => {
	switch (action.type) {
		case LOG_IN:
		case SET_LOGIN_CRED:
			return {
				...state,
				isLoggedIn: true,
				me: action.payload,
			};

		case LOG_OUT:
			return {
				...state,
				isLoggedIn: false,
				me: null,
			};

		case AUTH_TASK_LOADING:
			return {
				...state,
				loading: true,
			};

		case AUTH_TASK_SUCCESS:
		case AUTH_TASK_FAIL:
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};

export default reducer;
