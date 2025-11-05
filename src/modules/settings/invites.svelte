<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Mail, RefreshCw, Trash2, Loader2, UserPlus } from "lucide-svelte";
	import type { Invite } from "$svc/invites/invites.types";
	import SendInviteModal from "$modules/settings/invites/send-invite-modal.svelte";
	import ResendInviteModal from "$modules/settings/invites/resend-invite-modal.svelte";
	import DeleteInviteModal from "$modules/settings/invites/delete-invite-modal.svelte";

	let invites = $state<Invite[]>([]);
	let isLoadingData = $state(false);
	let isSendModalOpen = $state(false);
	let isResendModalOpen = $state(false);
	let isDeleteModalOpen = $state(false);
	let selectedInvite = $state<Invite | null>(null);

	async function fetchInvites() {
		isLoadingData = true;
		// Note: No GET endpoint available in API for fetching invites
		// Only send, accept, decline, resend, and delete operations are supported
		invites = [];
		isLoadingData = false;
	}

	function handleResend(invite: Invite) {
		selectedInvite = invite;
		isResendModalOpen = true;
	}

	function handleDelete(invite: Invite) {
		selectedInvite = invite;
		isDeleteModalOpen = true;
	}

	function getStatusColor(status: string) {
		switch (status) {
			case 'Accepted':
				return 'bg-green-100 text-green-800';
			case 'Declined':
				return 'bg-red-100 text-red-800';
			case 'Pending':
			default:
				return 'bg-yellow-100 text-yellow-800';
		}
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	$effect(() => {
		fetchInvites();
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold">Team Invites</h2>
			<p class="text-muted-foreground mt-1">Invite team members to join your company</p>
		</div>
		<Button class="gap-2" onclick={() => (isSendModalOpen = true)}>
			<UserPlus class="w-4 h-4" />
			Send Invite
		</Button>
	</div>

	<Card.Root>
		<Card.Header>
			<Card.Title>Invite Management</Card.Title>
			<Card.Description>View and manage team invitations</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="text-center py-12">
				<Mail class="w-12 h-12 text-muted-foreground mx-auto mb-3" />
				<p class="text-muted-foreground">Send invitations to team members</p>
				<p class="text-sm text-muted-foreground mt-2">Click "Send Invite" to invite team members to join your company.</p>
			</div>
			<!-- Note: Invite list view not available as API doesn't provide a GET endpoint -->
			{#if false}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
					{#each invites as invite (invite.Id)}
						<div
							class="flex flex-col p-4 rounded-lg border hover:bg-accent transition-colors"
						>
							<div class="flex items-start justify-between mb-3">
								<div class="flex-1 min-w-0">
									<h3 class="text-sm font-semibold truncate">{invite.Email}</h3>
									<p class="text-xs text-muted-foreground mt-1">
										Sent: {formatDate(invite.SentAt)}
									</p>
								</div>
								<span
									class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(invite.Status)}"
								>
									{invite.Status}
								</span>
							</div>

							{#if invite.RespondedAt}
								<p class="text-xs text-muted-foreground mb-3">
									Responded: {formatDate(invite.RespondedAt)}
								</p>
							{/if}

							<div class="flex items-center gap-2 mt-auto">
								{#if invite.Status === 'Pending'}
									<button
										onclick={() => handleResend(invite)}
										class="flex-1 flex items-center justify-center gap-1 p-2 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
										title="Resend"
									>
										<RefreshCw class="w-3 h-3" />
										Resend
									</button>
								{/if}
								<button
									onclick={() => handleDelete(invite)}
									class="flex-1 flex items-center justify-center gap-1 p-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
									title="Delete"
								>
									<Trash2 class="w-3 h-3" />
									Delete
								</button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

<SendInviteModal
	isOpen={isSendModalOpen}
	onClose={() => (isSendModalOpen = false)}
	onSuccess={fetchInvites}
/>

{#if selectedInvite}
	<ResendInviteModal
		isOpen={isResendModalOpen}
		invite={selectedInvite}
		onClose={() => (isResendModalOpen = false)}
		onSuccess={fetchInvites}
	/>

	<DeleteInviteModal
		isOpen={isDeleteModalOpen}
		invite={selectedInvite}
		onClose={() => (isDeleteModalOpen = false)}
		onSuccess={fetchInvites}
	/>
{/if}
