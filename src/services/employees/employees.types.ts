import type { APIResponse } from '$lib/types';

export interface Employee {
	Id: string;
	FirstName: string;
	LastName: string;
	Email: string;
	IsActive: boolean;
	Role: string;
	CreatedAt: string;
	UpdatedAt: string;
	CompanyId: string;
}

export interface CreateEmployeeRequest {
	firstName: string;
	lastName: string;
	email: string;
	isActive: boolean;
	role: string;
}

export interface UpdateEmployeeRequest {
	firstName: string;
	lastName: string;
	email: string;
	isActive: boolean;
	role: string;
}

export type EmployeesResponse = APIResponse<Employee[]>;
export type EmployeeResponse = APIResponse<Employee>;
