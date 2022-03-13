import { FETCH_ALL_CLUBS } from "./club.types";

const INITIAL_STATE = {
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

		default:
			return state;
	}
};

export default reducer;
