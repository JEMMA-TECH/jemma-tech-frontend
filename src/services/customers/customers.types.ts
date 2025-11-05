import type { APIResponse, BaseEntity } from '$lib/types';

export interface Company {
	Id: string;
	Name: string;
	Address: string;
	PhoneNumber: string;
	Email: string;
	CreatedAt: string;
	UpdatedAt: string;
}

export interface Customer {
	Id: string;
	CompanyId: string;
	FirstName: string;
	LastName: string;
	Email: string;
	PhoneNumber: string;
	Company: Company;
	CreatedAt: string;
	UpdatedAt: string;
}

export interface CreateCustomerRequest {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}

export interface UpdateCustomerRequest {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}

// The API returns an array directly in Data, not a pagination object
export type CustomersResponse = APIResponse<Customer[]>;
export type CustomerResponse = APIResponse<Customer>;
