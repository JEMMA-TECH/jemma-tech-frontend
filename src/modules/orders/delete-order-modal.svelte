<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { Order } from '$svc/orders/orders.types';
	import { deleteOrder } from '$svc/orders/orders.service';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		order: Order;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), order, onClose, onSuccess }: ModalProps = $props();

	let isSubmitting = $state(false);

	async function handleDelete() {
		isSubmitting = true;

		const result = await deleteOrder(order.Id);

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Order deleted successfully!');
			onSuccess();
			onClose();
		} else {
			toast.error(result.Message || 'Failed to delete order');
		}
	}
</script>

<AlertDialog.Root bind:open={isOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Order</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure you want to delete order <strong>#{order.Id.substring(0, 8)}</strong> for{' '}
				<strong
					>{order.Customer?.FirstName || ''} {order.Customer?.LastName || ''}</strong
				>? This action cannot be undone.
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
