import { api } from '$lib/common/axios';
import { pref } from '$lib/common/local-storage';

interface LoginRequest {
	email: string;
	password: string;
}

interface RegisterRequest {
	companyName: string;
	address: string;
	companyEmail: string;
	companyPhone: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
}

interface AuthResponse {
	IsSuccess: boolean;
	Message: string;
	Data?: {
		accessToken?: string;
		refreshToken?: string;
		user?: any;
	};
}

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
	try {
		const response = await api.post('/auth/login', credentials);

		if (response.data.IsSuccess) {
			// Store tokens if provided
			const accessToken = response.data.Data?.AccessToken;
			const refreshToken = response.data.Data?.RefreshToken;

			if (accessToken) {
				pref.set('@jemma/access', accessToken);
			}

			if (refreshToken) {
				pref.set('@jemma/refresh', refreshToken);
			}
		}

		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Login failed'
		};
	}
}

export async function register(userData: RegisterRequest): Promise<AuthResponse> {
	try {
		const response = await api.post('/auth/register', userData);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Registration failed'
		};
	}
}