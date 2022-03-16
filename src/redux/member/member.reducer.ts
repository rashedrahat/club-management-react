import { FETCH_MEMBERS } from "./member.types";

const INITIAL_STATE = {
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

		default:
			return state;
	}
};

export default reducer;
