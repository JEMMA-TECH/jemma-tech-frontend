import { api } from '$lib/common/axios';
import type { DashboardResponse, DashboardParams } from './dashboard.types';

const BASE_URL = '/dashboard';

export const dashboardService = {
	/**
	 * Get dashboard data with optional filters
	 */
	async getDashboard(params?: DashboardParams): Promise<DashboardResponse> {
		try {
			const response = await api.get<DashboardResponse>(BASE_URL, { params });
			return response.data;
		} catch (error: any) {
			return {
				IsSuccess: false,
				Message: error.response?.data?.Message || error.message || 'Failed to fetch dashboard',
				Data: null as any
			};
		}
	}
};
