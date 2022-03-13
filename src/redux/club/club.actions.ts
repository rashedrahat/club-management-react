import { FETCH_ALL_CLUBS } from "./club.types";

export const fetchClubs = (payload: object[]) => {
	return {
		type: FETCH_ALL_CLUBS,
		payload,
	};
};
