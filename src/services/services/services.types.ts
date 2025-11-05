import type { APIResponse } from '$lib/types';

export interface Service {
	Id: string;
	Name: string;
	CreatedAt: string;
	UpdatedAt: string;
	CompanyId: string;
}

export interface CreateServiceRequest {
	name: string;
}

export interface UpdateServiceRequest {
	name: string;
}

export type ServicesResponse = APIResponse<Service[]>;
export type ServiceResponse = APIResponse<Service>;
