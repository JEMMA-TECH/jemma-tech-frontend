import { api } from '$lib/common/axios';
import type { PaginationParams } from '$lib/types';
import type {
	CustomersResponse,
	CustomerResponse,
	CreateCustomerRequest,
	UpdateCustomerRequest
} from './customers.types';

/**
 * Get list of customers
 */
export async function getCustomers(params?: PaginationParams): Promise<CustomersResponse> {
	try {
		const queryParams = new URLSearchParams();
		if (params?.page) queryParams.append('page', params.page.toString());
		if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
		if (params?.search) queryParams.append('search', params.search);

		const url = `/company/customers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
		const response = await api.get(url);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch customers',
			Data: []
		};
	}
}

/**
 * Get customer by ID
 */
export async function getCustomerById(id: string): Promise<CustomerResponse> {
	try {
		const response = await api.get(`/company/customers/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch customer',
			Data: null as any
		};
	}
}

/**
 * Create new customer
 */
export async function createCustomer(data: CreateCustomerRequest): Promise<CustomerResponse> {
	try {
		const response = await api.post('/company/customers', data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to create customer',
			Data: null as any
		};
	}
}

/**
 * Update existing customer
 */
export async function updateCustomer(
	id: string,
	data: UpdateCustomerRequest
): Promise<CustomerResponse> {
	try {
		const response = await api.put(`/company/customers/${id}`, data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to update customer',
			Data: null as any
		};
	}
}

/**
 * Delete customer
 */
export async function deleteCustomer(id: string): Promise<CustomerResponse> {
	try {
		const response = await api.delete(`/company/customers/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to delete customer',
			Data: null as any
		};
	}
}
