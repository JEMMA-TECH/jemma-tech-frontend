import type { APIResponse } from '$lib/types';

export interface Invite {
	Id: string;
	Email: string;
	Token: string;
	Status: 'Pending' | 'Accepted' | 'Declined';
	SentAt: string;
	RespondedAt?: string;
	CompanyId: string;
}

export interface SendInviteRequest {
	email: string;
}

export interface AcceptInviteRequest {
	token: string;
}

export interface DeclineInviteRequest {
	token: string;
}

export interface ResendInviteRequest {
	token: string;
}

export type InvitesResponse = APIResponse<Invite[]>;
export type InviteResponse = APIResponse<Invite>;
