<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { Payment } from '$svc/payments/payments.types';
	import { deletePayment } from '$svc/payments/payments.service';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		payment: Payment;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), payment, onClose, onSuccess }: ModalProps = $props();

	let isSubmitting = $state(false);

	async function handleDelete() {
		isSubmitting = true;

		const result = await deletePayment(payment.Id);

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Payment deleted successfully!');
			onSuccess();
			onClose();
		} else {
			toast.error(result.Message || 'Failed to delete payment');
		}
	}
</script>

<AlertDialog.Root bind:open={isOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Payment</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure you want to delete payment <strong>#{payment.Id.substring(0, 8)}</strong> of{' '}
				<strong>GH₵ {payment.Amount?.toFixed(2)}</strong>? This action cannot be undone.
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
