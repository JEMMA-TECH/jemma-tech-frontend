<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import type { Payment } from '$svc/payments/payments.types';

	type ModalProps = {
		isOpen: boolean;
		payment: Payment;
		onClose: () => void;
	};

	let { isOpen = $bindable(), payment, onClose }: ModalProps = $props();

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getStatusColor(status: number) {
		switch (status) {
			case 0:
				return 'bg-yellow-100 text-yellow-800';
			case 1:
				return 'bg-green-100 text-green-800';
			case 2:
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	function getStatusLabel(status: number) {
		switch (status) {
			case 0:
				return 'Pending';
			case 1:
				return 'Paid';
			case 2:
				return 'Failed';
			default:
				return 'Unknown';
		}
	}
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content class="max-w-2xl">
		<Dialog.Header>
			<Dialog.Title>Payment Details</Dialog.Title>
			<Dialog.Description>View complete payment information</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-6">
			<!-- Payment Info -->
			<div class="grid grid-cols-2 gap-4">
				<div>
					<p class="text-sm text-muted-foreground">Payment ID</p>
					<p class="font-medium">#{payment.Id.substring(0, 8)}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Status</p>
					<Badge class={getStatusColor(payment.PaymentStatus)}>
						{getStatusLabel(payment.PaymentStatus)}
					</Badge>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Amount</p>
					<p class="font-medium text-lg">GH₵ {payment.Amount?.toFixed(2) || '0.00'}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Order ID</p>
					<p class="font-medium">#{payment.OrderId?.substring(0, 8) || 'N/A'}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Created At</p>
					<p class="font-medium">{formatDate(payment.CreatedAt)}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Updated At</p>
					<p class="font-medium">{formatDate(payment.UpdatedAt)}</p>
				</div>
			</div>

			<!-- Customer Details -->
			{#if payment.Customer}
				<div class="border-t pt-4">
					<h3 class="text-lg font-semibold mb-3">Customer Details</h3>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<p class="text-sm text-muted-foreground">Name</p>
							<p class="font-medium">
								{payment.Customer.FirstName || ''} {payment.Customer.LastName || ''}
							</p>
						</div>
						<div>
							<p class="text-sm text-muted-foreground">Email</p>
							<p class="font-medium">{payment.Customer.Email || 'N/A'}</p>
						</div>
						<div>
							<p class="text-sm text-muted-foreground">Phone</p>
							<p class="font-medium">{payment.Customer.PhoneNumber || 'N/A'}</p>
						</div>
						{#if payment.Customer.Address}
							<div class="col-span-2">
								<p class="text-sm text-muted-foreground">Address</p>
								<p class="font-medium">{payment.Customer.Address}</p>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Order Details -->
			{#if payment.Order}
				<div class="border-t pt-4">
					<h3 class="text-lg font-semibold mb-3">Order Details</h3>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<p class="text-sm text-muted-foreground">Order Status</p>
							<p class="font-medium">{payment.Order.Status || 'N/A'}</p>
						</div>
						<div>
							<p class="text-sm text-muted-foreground">Order Total</p>
							<p class="font-medium">GH₵ {payment.Order.TotalAmount?.toFixed(2) || '0.00'}</p>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<Dialog.Footer class="mt-6">
			<Button onclick={onClose}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
