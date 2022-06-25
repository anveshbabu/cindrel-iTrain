import { axiosInstance } from "./utilities";
import { setapiProgressBar, apiProgressBar } from './helperFunctions';
import { EXIST_LOCAL_STORAGE, CONFIG } from './constants'


export var api = async function ({ method = "get", api, isFormData = false, prefixUrl, body, status = false, token = '', baseURL = "normal", email = "" }) {
	let config = {
		onUploadProgress: progressEvent => {
			let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
			setapiProgressBar(percentCompleted);
		}
	}

	console.log(getMicroServiceURL(baseURL) + api + (!!prefixUrl ? '/' + prefixUrl : ""), (body ? body : ""))

	return await new Promise((resolve, reject) => {
		// setting token

		axiosInstance.defaults.headers.common['Authorization'] = `${localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN) === null ? '' : localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN)}`
		if (isFormData) {
			axiosInstance.defaults.headers["Content-Type"] = "multipart/form-data"
		} else {
			axiosInstance.defaults.headers["Content-Type"] = "application/json"
		}

		axiosInstance[method](`${getMicroServiceURL(baseURL) + api + (!!prefixUrl ? prefixUrl : "")}`, (body ? body : ""), config).then((response) => {
			resolve(statusHelper(status, response))

		}).catch((error) => {
			console.log('error------------>', error)

			try {

				if (error.response) {

					reject(statusHelper(status, error.response))

				} else {

					reject(statusHelper(status, error.response))


				}

			}

			catch (err) {
				console.log('error------------>', err)
				reject(err)

			}

		})



	})
}





export const formDataApi = async ({ method = "get", api, isFormData = false, prefixUrl, body, status = false, token = '', baseURL = "normal", email = "" }) => {
	try {
		return await new Promise((resolve, reject) => {

			fetch(`${getMicroServiceURL(baseURL) + api + (!!prefixUrl ? prefixUrl : "")}`, {
				method,
				body
			}).then(response => response.json()).then(async (response) => {
				console.log('api call end')
				resolve(statusHelper(status, response))


			}).catch((error) => {
				reject(statusHelper(status, error))

			});
		})

	} catch (e) {

	}
}








var statusHelper = (status, data) => {

	if (status) {
		return {
			status: data.status,
			...data.data
		}
	} else {
		return data.data
	}
}




// local api base url
let getMicroServiceURL = (baseURL) => {

	switch (baseURL) {
		case 'normal':
			return CONFIG.API_URL;
		case 'test':
			return 'https://jsonplaceholder.typicode.com';
		default:
			break;
	}

}



export const apiServiceURL = (baseURL = 'normal') => {

	return getMicroServiceURL(baseURL)

}