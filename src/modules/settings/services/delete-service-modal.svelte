<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { Service } from '$svc/services/services.types';
	import { deleteService } from '$svc/services/services.service';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		service: Service;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), service, onClose, onSuccess }: ModalProps = $props();

	let isDeleting = $state(false);

	function handleOpenChange(open: boolean) {
		if (!open) {
			onClose();
		}
	}

	async function handleDelete() {
		isDeleting = true;

		const result = await deleteService(service.Id);

		isDeleting = false;

		if (result.IsSuccess) {
			toast.success('Service deleted successfully!');
			onSuccess();
			onClose();
		} else {
			toast.error(result.Message || 'Failed to delete service');
		}
	}
</script>

<AlertDialog.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This will permanently delete the service <strong>{service.Name}</strong>. This action cannot
				be undone.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel onclick={onClose}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={handleDelete} disabled={isDeleting} class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
				{isDeleting ? 'Deleting...' : 'Delete'}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
