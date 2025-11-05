import type { APIResponse } from '$lib/types';
import type { Customer } from '$svc/customers/customers.types';

export interface OrderItem {
	Id: string;
	ItemId: string;
	ItemName: string;
	Quantity: number;
	Price: number;
	Total: number;
}

export interface Order {
	Id: string;
	CustomerId: string;
	Customer: Customer;
	OrderItems: OrderItem[];
	CreatedAt: string;
	UpdatedAt: string;
	CompanyId: string;
	Status: string;
	TotalAmount: number;
}

export interface CreateOrderRequest {
	customerId: string;
	orderItemIds: string[];
}

export interface UpdateOrderRequest {
	customerId: string;
	orderItemIds: string[];
	status?: string;
}

export type OrdersResponse = APIResponse<Order[]>;
export type OrderResponse = APIResponse<Order>;
