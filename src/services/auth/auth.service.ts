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
			if (response.data.Data?.accessToken) {
				pref.set('@jemma/access', response.data.Data.accessToken);
			}
			if (response.data.Data?.refreshToken) {
				pref.set('@jemma/refresh', response.data.Data.refreshToken);
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