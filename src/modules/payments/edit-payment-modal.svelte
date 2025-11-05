<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { updatePayment } from '$svc/payments/payments.service';
	import type { Payment } from '$svc/payments/payments.types';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		payment: Payment;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), payment, onClose, onSuccess }: ModalProps = $props();

	let formData = $state({
		paymentStatus: payment.PaymentStatus
	});

	let isSubmitting = $state(false);

	$effect(() => {
		formData.paymentStatus = payment.PaymentStatus;
	});

	function handleOpenChange(open: boolean) {
		if (!open) {
			onClose();
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		isSubmitting = true;

		const result = await updatePayment(payment.Id, {
			paymentStatus: formData.paymentStatus
		});

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Payment updated successfully!');
			onSuccess();
			onClose();
		} else {
			toast.error(result.Message || 'Failed to update payment');
		}
	}
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>Edit Payment</Dialog.Title>
			<Dialog.Description>Update payment status.</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<Label>Payment ID</Label>
				<p class="text-sm text-muted-foreground">#{payment.Id.substring(0, 8)}</p>
			</div>

			<div class="space-y-2">
				<Label>Amount</Label>
				<p class="text-sm text-muted-foreground">GH₵ {payment.Amount?.toFixed(2)}</p>
			</div>

			<div class="space-y-2">
				<Label for="status">Payment Status *</Label>
				<select
					id="status"
					bind:value={formData.paymentStatus}
					required
					class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					<option value={0}>Pending</option>
					<option value={1}>Paid</option>
					<option value={2}>Failed</option>
				</select>
			</div>

			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={onClose}>Cancel</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Updating...' : 'Update Payment'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
