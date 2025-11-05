import { api } from '$lib/common/axios';
import type {
	CreateEmployeeRequest,
	EmployeeResponse,
	EmployeesResponse,
	UpdateEmployeeRequest
} from './employees.types';
import type { PaginationParams } from '$lib/types';

export async function getEmployees(params?: PaginationParams): Promise<EmployeesResponse> {
	try {
		const queryParams = new URLSearchParams();
		if (params?.page) queryParams.append('page', params.page.toString());
		if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
		if (params?.search) {
			queryParams.append('search', params.search);
		}

		const url = `/company/employees${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
		const response = await api.get(url);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch employees',
			Data: []
		};
	}
}

export async function getEmployee(id: string): Promise<EmployeeResponse> {
	try {
		const response = await api.get(`/company/employees/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch employee',
			Data: null
		};
	}
}

export async function createEmployee(data: CreateEmployeeRequest): Promise<EmployeeResponse> {
	try {
		const response = await api.post('/company/employees', data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to create employee',
			Data: null
		};
	}
}

export async function updateEmployee(
	id: string,
	data: UpdateEmployeeRequest
): Promise<EmployeeResponse> {
	try {
		const response = await api.put(`/company/employees/${id}`, data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to update employee',
			Data: null
		};
	}
}

export async function deleteEmployee(id: string): Promise<EmployeeResponse> {
	try {
		const response = await api.delete(`/company/employees/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to delete employee',
			Data: null
		};
	}
}
