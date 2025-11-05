import { api } from '$lib/common/axios';
import type {
	SendInviteRequest,
	InviteResponse,
	InvitesResponse,
	AcceptInviteRequest,
	DeclineInviteRequest,
	ResendInviteRequest
} from './invites.types';

export async function sendInvite(data: SendInviteRequest): Promise<InviteResponse> {
	try {
		const response = await api.post(`/company/invites/${data.email}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to send invite',
			Data: null
		};
	}
}

export async function acceptInvite(data: AcceptInviteRequest): Promise<InviteResponse> {
	try {
		const response = await api.post(`/company/invites/accept/${data.token}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to accept invite',
			Data: null
		};
	}
}

export async function declineInvite(data: DeclineInviteRequest): Promise<InviteResponse> {
	try {
		const response = await api.post(`/company/invites/decline/${data.token}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to decline invite',
			Data: null
		};
	}
}

export async function resendInvite(data: ResendInviteRequest): Promise<InviteResponse> {
	try {
		const response = await api.post(`/company/invites/resend/${data.token}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to resend invite',
			Data: null
		};
	}
}

export async function deleteInvite(token: string): Promise<InviteResponse> {
	try {
		const response = await api.delete(`/company/invites/${token}`);
		return response.data;
	} catch (error: any) {
		return {
			IsSuccess: false,
			Message: error.response?.data?.Message || error.message || 'Failed to delete invite',
			Data: null
		};
	}
}
