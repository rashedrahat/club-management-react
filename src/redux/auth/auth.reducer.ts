import { LOG_IN, LOG_OUT, SET_LOGIN_CRED } from "./auth.types";

const INITIAL_STATE = {
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

		default:
			return state;
	}
};

export default reducer;
