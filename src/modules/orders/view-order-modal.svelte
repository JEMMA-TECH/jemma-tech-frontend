<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ChevronDown } from 'lucide-svelte';
	import type { Order } from '$svc/orders/orders.types';

	type ModalProps = {
		isOpen: boolean;
		order: Order;
		onClose: () => void;
	};

	let { isOpen = $bindable(), order, onClose }: ModalProps = $props();

	let isOrderItemsOpen = $state(true);

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getStatusColor(status: string) {
		switch (status?.toLowerCase()) {
			case 'completed':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'in progress':
				return 'bg-blue-100 text-blue-800';
			case 'cancelled':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content class="max-w-3xl max-h-[90vh] overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Order Details</Dialog.Title>
			<Dialog.Description>View complete order information</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-6">
			<!-- Order Info -->
			<div class="grid grid-cols-2 gap-4">
				<div>
					<p class="text-sm text-muted-foreground">Order ID</p>
					<p class="font-medium">#{order.Id.substring(0, 8)}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Status</p>
					<Badge class={getStatusColor(order.Status)}>{order.Status}</Badge>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Customer</p>
					<p class="font-medium">
						{order.Customer?.FirstName || ''} {order.Customer?.LastName || ''}
					</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Total Amount</p>
					<p class="font-medium">GH₵ {order.TotalAmount?.toFixed(2) || '0.00'}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Created At</p>
					<p class="font-medium">{formatDate(order.CreatedAt)}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Updated At</p>
					<p class="font-medium">{formatDate(order.UpdatedAt)}</p>
				</div>
			</div>

			<!-- Order Items -->
			<Collapsible.Root bind:open={isOrderItemsOpen}>
				<Collapsible.Trigger class="flex items-center justify-between w-full">
					<h3 class="text-lg font-semibold">Order Items ({order.OrderItems?.length || 0})</h3>
					<ChevronDown
						class="h-4 w-4 transition-transform duration-200 {isOrderItemsOpen
							? 'transform rotate-180'
							: ''}"
					/>
				</Collapsible.Trigger>
				<Collapsible.Content class="mt-4">
					{#if order.OrderItems && order.OrderItems.length > 0}
						<div class="space-y-2">
							{#each order.OrderItems as item}
								<div class="flex items-center justify-between p-3 bg-muted rounded-lg">
									<div class="flex-1">
										<p class="font-medium">{item.ItemName}</p>
										<p class="text-sm text-muted-foreground">Quantity: {item.Quantity}</p>
									</div>
									<div class="text-right">
										<p class="font-medium">GH₵ {item.Total?.toFixed(2) || '0.00'}</p>
										<p class="text-sm text-muted-foreground">
											@ GH₵ {item.Price?.toFixed(2) || '0.00'}
										</p>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="text-sm text-muted-foreground">No items in this order</p>
					{/if}
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- Customer Details -->
			{#if order.Customer}
				<div class="border-t pt-4">
					<h3 class="text-lg font-semibold mb-3">Customer Details</h3>
					<div class="grid grid-cols-2 gap-4">
						<div>
							<p class="text-sm text-muted-foreground">Email</p>
							<p class="font-medium">{order.Customer.Email || 'N/A'}</p>
						</div>
						<div>
							<p class="text-sm text-muted-foreground">Phone</p>
							<p class="font-medium">{order.Customer.PhoneNumber || 'N/A'}</p>
						</div>
						{#if order.Customer.Address}
							<div class="col-span-2">
								<p class="text-sm text-muted-foreground">Address</p>
								<p class="font-medium">{order.Customer.Address}</p>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>

		<Dialog.Footer class="mt-6">
			<Button onclick={onClose}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
