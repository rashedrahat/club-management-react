import { FETCH_MEMBERS } from "./member.types";

export const fetchMembers = (payload: object[]) => {
	return {
		type: FETCH_MEMBERS,
		payload,
	};
};
