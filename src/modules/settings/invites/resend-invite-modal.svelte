<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { Invite } from '$svc/invites/invites.types';
	import { resendInvite } from '$svc/invites/invites.service';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		invite: Invite;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), invite, onClose, onSuccess }: ModalProps = $props();

	let isSubmitting = $state(false);

	async function handleResend() {
		isSubmitting = true;

		const result = await resendInvite({ token: invite.Token });

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Invite resent successfully!');
			onSuccess();
			onClose();
		} else {
			toast.error(result.Message || 'Failed to resend invite');
		}
	}
</script>

<AlertDialog.Root bind:open={isOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Resend Invite</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure you want to resend the invitation to <strong>{invite.Email}</strong>? They
				will receive a new invitation email.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel onclick={onClose}>Cancel</AlertDialog.Cancel>
			<Button onclick={handleResend} disabled={isSubmitting}>
				{isSubmitting ? 'Resending...' : 'Resend'}
			</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
