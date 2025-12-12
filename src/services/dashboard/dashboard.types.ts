import type { APIResponse } from '$lib/types';
import type { Order } from '$svc/orders/orders.types';
import type { Customer } from '$svc/customers/customers.types';
import type { Payment } from '$svc/payments/payments.types';

export interface DashboardStats {
	TotalOrders: number;
	TotalCustomers: number;
	TotalRevenue: number;
	PendingOrders: number;
	CompletedOrders: number;
	InProgressOrders: number;
	TotalPayments: number;
	PendingPayments: number;
	CompletedPayments: number;
	RevenueGrowth: number;
	OrderGrowth: number;
	CustomerGrowth: number;
}

export interface DashboardData {
	Stats: DashboardStats;
	RecentOrders: Order[];
	RecentCustomers: Customer[];
	RecentPayments: Payment[];
	RevenueByDay: RevenueDataPoint[];
	OrdersByStatus: StatusDataPoint[];
	RevenueByMonth: RevenueDataPoint[];
}

export interface RevenueDataPoint {
	Date: string;
	Revenue: number;
}

export interface StatusDataPoint {
	Status: string;
	Count: number;
}

export interface DashboardParams {
	employeeId?: string;
	role?: number;
	timeFrame?: 'daily' | 'weekly' | 'monthly';
	from?: string;
	to?: string;
}

export type DashboardResponse = APIResponse<DashboardData>;
