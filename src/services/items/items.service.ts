import { api } from '$lib/common/axios';
import type {
	CreateItemRequest,
	ItemResponse,
	ItemsResponse,
	UpdateItemRequest
} from './items.types';
import type { PaginationParams } from '$lib/types';

export async function getItems(params?: PaginationParams): Promise<ItemsResponse> {
	try {
		const queryParams = new URLSearchParams();
		if (params?.page) queryParams.append('page', params.page.toString());
		if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
		if (params?.search) {
			queryParams.append('search', params.search);
		}

		const url = `/company/items${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
		const response = await api.get(url);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch items',
			Data: []
		};
	}
}

export async function getItem(id: string): Promise<ItemResponse> {
	try {
		const response = await api.get(`/company/items/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to fetch item',
			Data: null
		};
	}
}

export async function createItem(data: CreateItemRequest): Promise<ItemResponse> {
	try {
		const response = await api.post('/company/items', data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to create item',
			Data: null
		};
	}
}

export async function updateItem(id: string, data: UpdateItemRequest): Promise<ItemResponse> {
	try {
		const response = await api.put(`/company/items/${id}`, data);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to update item',
			Data: null
		};
	}
}

export async function deleteItem(id: string): Promise<ItemResponse> {
	try {
		const response = await api.delete(`/company/items/${id}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to delete item',
			Data: null
		};
	}
}
