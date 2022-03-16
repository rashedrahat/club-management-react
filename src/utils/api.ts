import axios, { AxiosRequestConfig } from "axios";

export const parseGET = <Res>(url: string, options?: AxiosRequestConfig) => {
	return axios
		.get<Res>(url, options)
		.then((response) => response.data)
		.catch((err) => err);
};

export const parsePOST = <Req, Res>(
	url: string,
	body: Req,
	options?: AxiosRequestConfig
) => {
	return axios
		.post<Res>(url, body, options)
		.then((response) => response.data)
		.catch((err) => err);
};

export const parsePUT = <Req, Res>(
	url: string,
	body: Req,
	options?: AxiosRequestConfig
) => {
	return axios
		.put<Res>(url, body, options)
		.then((response) => response.data)
		.catch((err) => err);
};

export const parseDELETE = <Res>(url: string, options?: AxiosRequestConfig) => {
	return axios
		.delete<Res>(url, options)
		.then((response) => response.data)
		.catch((err) => err);
};
