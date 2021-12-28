export const API_URL = process.env.REACT_APP_API_URL;
export const axiosConfig = (token) => {
	return { headers: { Authorization: `${token}` } };
};