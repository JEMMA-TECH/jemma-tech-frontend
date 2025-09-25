import axios, {
	type AxiosInstance,
	type AxiosResponse,
	type InternalAxiosRequestConfig
} from 'axios';
import { pref } from './local-storage';
import logger from './logger';

const API_BASE_URL = 'https://jemma-tech-backend-production.up.railway.app/api';

export const api: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
});

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (typeof window !== 'undefined') {
			const token = pref.get('@jemma/access');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

let isRefreshing = false;
let failedRequestsQueue: (() => void)[] = [];

api.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve) => {
					failedRequestsQueue.push(() => resolve(api(originalRequest)));
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const refreshToken = pref.get('@jemma/refresh');
				if (!refreshToken) {
					throw new Error('No refresh token available');
				}

				logger.debug('Attempting to refresh access token');
				const response = await axios.post(
					`${API_BASE_URL}/auth/refresh`,
					{
						refreshToken: refreshToken
					},
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				);

				const newAccessToken = response.data.Data?.accessToken || response.data.accessToken;
				const newRefreshToken = response.data.Data?.refreshToken || response.data.refreshToken;

				if (!newAccessToken) {
					throw new Error('No access token in refresh response');
				}

				pref.set('@jemma/access', newAccessToken);
				if (newRefreshToken) {
					pref.set('@jemma/refresh', newRefreshToken);
				}

				failedRequestsQueue.forEach((cb) => cb());
				failedRequestsQueue = [];

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return api(originalRequest);
			} catch (refreshError) {
				logger.error('Token refresh failed:', refreshError);

				pref.remove('@jemma/access');
				pref.remove('@jemma/refresh');

				if (typeof window !== 'undefined') {
					window.location.href = '/init';
				}

				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);