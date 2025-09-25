export interface APIResponse<T = any> {
	IsSuccess: boolean;
	Data: T;
	Message: string;
	Errors?: string[];
}

export interface PaginatedResponse<T> {
	Items: T[];
	TotalCount: number;
	Page: number;
	PageSize: number;
	TotalPages: number;
}

export interface PaginationParams {
	page?: number;
	pageSize?: number;
	search?: string;
}

export type UserRole = 'Admin' | 'User';

export interface BaseEntity {
	Id: string;
	CreatedAt: string;
	UpdatedAt: string;
}