import type { APIResponse } from '$lib/types';
import type { Service } from '$svc/services/services.types';

export interface Item {
	Id: string;
	Name: string;
	Price: number;
	ServiceId: string;
	Service: Service;
	CreatedAt: string;
	UpdatedAt: string;
	CompanyId: string;
}

export interface CreateItemRequest {
	name: string;
	price: number;
	serviceId: string;
}

export interface UpdateItemRequest {
	name: string;
	price: number;
	serviceId: string;
}

export type ItemsResponse = APIResponse<Item[]>;
export type ItemResponse = APIResponse<Item>;
