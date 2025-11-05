<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { deleteCustomer } from '$svc/customers/customers.service';
	import type { Customer } from '$svc/customers/customers.types';
	import { Loader, AlertTriangle } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		customer: Customer;
		onClose: () => void;
		onLoadData: () => void;
	};

	let { isOpen = $bindable(), customer, onClose, onLoadData }: ModalProps = $props();

	let isDeleting = $state(false);

	async function handleDelete() {
		isDeleting = true;
		try {
			const result = await deleteCustomer(customer.Id);

			if (result.IsSuccess) {
				toast.success(result.Message || 'Customer deleted successfully!');
				onClose();
				onLoadData();
			} else {
				toast.error(result.Message || 'Failed to delete customer');
			}
		} catch (error) {
			toast.error('An unexpected error occurred');
			console.error('Delete customer error:', error);
		} finally {
			isDeleting = false;
		}
	}
</script>

<AlertDialog.Root bind:open={isOpen} onOpenChange={(open) => !open && onClose()}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<div class="flex items-center gap-2">
				<AlertTriangle class="h-5 w-5 text-red-600" />
				<AlertDialog.Title>Delete Customer</AlertDialog.Title>
			</div>
			<AlertDialog.Description>
				Are you sure you want to delete <strong
					>{customer.FirstName}
					{customer.LastName}</strong
				>? This action cannot be undone and will permanently remove this customer and all associated
				data.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel disabled={isDeleting}>Cancel</AlertDialog.Cancel>
			<Button variant="destructive" onclick={handleDelete} disabled={isDeleting}>
				{#if isDeleting}
					<Loader class="mr-2 h-4 w-4 animate-spin" />
					Deleting...
				{:else}
					Delete Customer
				{/if}
			</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
