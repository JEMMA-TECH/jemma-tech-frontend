import { api } from '$lib/common/axios';
import type {
	CreateServiceRequest,
	ServiceResponse,
	ServicesResponse,
	UpdateServiceRequest
} from './services.types';
import type { PaginationParams } from '$lib/types';

export async function getServices(params?: PaginationParams): Promise<ServicesResponse> {
	try {
		const queryParams = new URLSearchParams();
		if (params?.page) queryParams.append('page', params.page.toString());
		if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
		if (params?.search) {
			queryParams.append('search', params.search);
		}

		const url = `/company/services${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
		const response = await api.get(url);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch services',
			Data: []
		};
	}
}

export async function getService(id: string): Promise<ServiceResponse> {
	try {
		const response = await api.get(`/company/services/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch service',
			Data: null
		};
	}
}

export async function createService(data: CreateServiceRequest): Promise<ServiceResponse> {
	try {
		const response = await api.post('/company/services', data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to create service',
			Data: null
		};
	}
}

export async function updateService(
	id: string,
	data: UpdateServiceRequest
): Promise<ServiceResponse> {
	try {
		const response = await api.put(`/company/services/${id}`, data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to update service',
			Data: null
		};
	}
}

export async function deleteService(id: string): Promise<ServiceResponse> {
	try {
		const response = await api.delete(`/company/services/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to delete service',
			Data: null
		};
	}
}
