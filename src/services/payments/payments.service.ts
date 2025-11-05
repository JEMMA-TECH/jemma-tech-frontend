import { api } from '$lib/common/axios';
import type {
	CreatePaymentRequest,
	PaymentResponse,
	PaymentsResponse,
	UpdatePaymentRequest
} from './payments.types';
import type { PaginationParams } from '$lib/types';

export async function getPayments(params?: PaginationParams): Promise<PaymentsResponse> {
	try {
		const queryParams = new URLSearchParams();
		if (params?.page) queryParams.append('page', params.page.toString());
		if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
		if (params?.search) {
			queryParams.append('search', params.search);
		}

		const url = `/company/payments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
		const response = await api.get(url);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch payments',
			Data: []
		};
	}
}

export async function getPayment(id: string): Promise<PaymentResponse> {
	try {
		const response = await api.get(`/company/payments/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch payment',
			Data: null
		};
	}
}

export async function createPayment(data: CreatePaymentRequest): Promise<PaymentResponse> {
	try {
		const response = await api.post('/company/payments', data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to create payment',
			Data: null
		};
	}
}

export async function updatePayment(id: string, data: UpdatePaymentRequest): Promise<PaymentResponse> {
	try {
		const response = await api.put(`/company/payments/${id}`, data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to update payment',
			Data: null
		};
	}
}

export async function deletePayment(id: string): Promise<PaymentResponse> {
	try {
		const response = await api.delete(`/company/payments/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to delete payment',
			Data: null
		};
	}
}
