import { api } from '$lib/common/axios';
import type {
	CreateOrderRequest,
	OrderResponse,
	OrdersResponse,
	UpdateOrderRequest
} from './orders.types';
import type { PaginationParams } from '$lib/types';

export async function getOrders(params?: PaginationParams): Promise<OrdersResponse> {
	try {
		const queryParams = new URLSearchParams();
		if (params?.page) queryParams.append('page', params.page.toString());
		if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
		if (params?.search) {
			queryParams.append('search', params.search);
		}

		const url = `/company/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
		const response = await api.get(url);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch orders',
			Data: []
		};
	}
}

export async function getOrder(id: string): Promise<OrderResponse> {
	try {
		const response = await api.get(`/company/orders/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch order',
			Data: null
		};
	}
}

export async function createOrder(data: CreateOrderRequest): Promise<OrderResponse> {
	try {
		const response = await api.post('/company/orders', data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to create order',
			Data: null
		};
	}
}

export async function updateOrder(id: string, data: UpdateOrderRequest): Promise<OrderResponse> {
	try {
		const response = await api.put(`/company/orders/${id}`, data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to update order',
			Data: null
		};
	}
}

export async function deleteOrder(id: string): Promise<OrderResponse> {
	try {
		const response = await api.delete(`/company/orders/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to delete order',
			Data: null
		};
	}
}
