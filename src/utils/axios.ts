// import axios from "axios";
// const customFetch=axios.create({
//     baseURL: "https://redux-toolkit-jobster-api-server.onrender.com/api/v1",
// });
// export default customFetch;

import axios from "axios";
import { getUserFromLocalStorage } from "./localstorage";

const customFetch = axios.create({
	baseURL: "https://redux-toolkit-jobster-api-server.onrender.com/api/v1",
});

customFetch.interceptors.request.use(
	(config) => {
		const user = getUserFromLocalStorage();
		if (user) {
			config.headers["Authorization"] = `Bearer ${user.token}`;
			// in the latest version "common" returns undefined
			// config.headers.common['Authorization'] = `Bearer ${user.token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default customFetch;