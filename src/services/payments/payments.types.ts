import type { APIResponse } from '$lib/types';
import type { Customer } from '$svc/customers/customers.types';
import type { Order } from '$svc/orders/orders.types';

export interface Payment {
	Id: string;
	Amount: number;
	CustomerId: string;
	Customer: Customer;
	OrderId: string;
	Order: Order;
	PaymentStatus: number;
	CreatedAt: string;
	UpdatedAt: string;
	CompanyId: string;
}

export interface CreatePaymentRequest {
	amount: number;
	customerId: string;
	orderId: string;
	paymentStatus: number;
}

export interface UpdatePaymentRequest {
	paymentStatus: number;
}

export type PaymentsResponse = APIResponse<Payment[]>;
export type PaymentResponse = APIResponse<Payment>;
