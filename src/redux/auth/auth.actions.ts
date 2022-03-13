import { LOG_IN, LOG_OUT } from "./auth.types";

export const logIn = (payload: { userName: string; name: string }) => {
	return {
		type: LOG_IN,
		payload,
	};
};

export const logOut = () => {
	return {
		type: LOG_OUT,
	};
};
