<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { Invite } from '$svc/invites/invites.types';
	import { deleteInvite } from '$svc/invites/invites.service';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		invite: Invite;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), invite, onClose, onSuccess }: ModalProps = $props();

	let isSubmitting = $state(false);

	async function handleDelete() {
		isSubmitting = true;

		const result = await deleteInvite(invite.Token);

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Invite deleted successfully!');
			onSuccess();
			onClose();
		} else {
			toast.error(result.Message || 'Failed to delete invite');
		}
	}
</script>

<AlertDialog.Root bind:open={isOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Invite</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure you want to delete the invitation for <strong>{invite.Email}</strong>? This
				action cannot be undone.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel onclick={onClose}>Cancel</AlertDialog.Cancel>
			<Button variant="destructive" onclick={handleDelete} disabled={isSubmitting}>
				{isSubmitting ? 'Deleting...' : 'Delete'}
			</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
