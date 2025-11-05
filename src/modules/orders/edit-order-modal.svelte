<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { updateOrder } from '$svc/orders/orders.service';
	import { getCustomers } from '$svc/customers/customers.service';
	import { getItems } from '$svc/items/items.service';
	import type { Customer } from '$svc/customers/customers.types';
	import type { Item } from '$svc/items/items.types';
	import type { Order } from '$svc/orders/orders.types';
	import { toast } from 'svelte-sonner';
	import { Plus, Trash2 } from 'lucide-svelte';

	type ModalProps = {
		isOpen: boolean;
		order: Order;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), order, onClose, onSuccess }: ModalProps = $props();

	let formData = $state({
		customerId: order.CustomerId,
		orderItemIds: order.OrderItems?.map((item) => item.ItemId) || [''],
		status: order.Status
	});

	let customers = $state<Customer[]>([]);
	let items = $state<Item[]>([]);
	let isLoadingCustomers = $state(false);
	let isLoadingItems = $state(false);
	let isSubmitting = $state(false);

	$effect(() => {
		formData.customerId = order.CustomerId;
		formData.orderItemIds = order.OrderItems?.map((item) => item.ItemId) || [''];
		formData.status = order.Status;
	});

	async function loadCustomers() {
		isLoadingCustomers = true;
		const result = await getCustomers();
		if (result.IsSuccess && result.Data) {
			customers = Array.isArray(result.Data) ? result.Data : [];
		}
		isLoadingCustomers = false;
	}

	async function loadItems() {
		isLoadingItems = true;
		const result = await getItems();
		if (result.IsSuccess && result.Data) {
			items = Array.isArray(result.Data) ? result.Data : [];
		}
		isLoadingItems = false;
	}

	$effect(() => {
		if (isOpen) {
			loadCustomers();
			loadItems();
		}
	});

	function handleOpenChange(open: boolean) {
		if (!open) {
			onClose();
		}
	}

	function addOrderItem() {
		formData.orderItemIds = [...formData.orderItemIds, ''];
	}

	function removeOrderItem(index: number) {
		if (formData.orderItemIds.length > 1) {
			formData.orderItemIds = formData.orderItemIds.filter((_, i) => i !== index);
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!formData.customerId) {
			toast.error('Please select a customer');
			return;
		}

		if (formData.orderItemIds.length === 0) {
			toast.error('Please add at least one item');
			return;
		}

		for (let i = 0; i < formData.orderItemIds.length; i++) {
			if (!formData.orderItemIds[i]) {
				toast.error(`Please select an item for row ${i + 1}`);
				return;
			}
		}

		isSubmitting = true;

		const result = await updateOrder(order.Id, {
			customerId: formData.customerId,
			orderItemIds: formData.orderItemIds,
			status: formData.status
		});

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Order updated successfully!');
			onSuccess();
			onClose();
		} else {
			toast.error(result.Message || 'Failed to update order');
		}
	}
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Content class="max-w-2xl max-h-[90vh] overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Edit Order</Dialog.Title>
			<Dialog.Description>Update order details.</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<Label for="customer">Customer *</Label>
				<select
					id="customer"
					bind:value={formData.customerId}
					required
					class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					<option value="" disabled>Select a customer</option>
					{#if isLoadingCustomers}
						<option value="" disabled>Loading customers...</option>
					{:else if customers.length === 0}
						<option value="" disabled>No customers available</option>
					{:else}
						{#each customers as customer}
							<option value={customer.Id}>
								{customer.FirstName} {customer.LastName} - {customer.Email}
							</option>
						{/each}
					{/if}
				</select>
			</div>

			<div class="space-y-2">
				<Label for="status">Status *</Label>
				<select
					id="status"
					bind:value={formData.status}
					required
					class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					<option value="Pending">Pending</option>
					<option value="In Progress">In Progress</option>
					<option value="Completed">Completed</option>
					<option value="Cancelled">Cancelled</option>
				</select>
			</div>

			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<Label>Order Items *</Label>
					<Button type="button" size="sm" variant="outline" onclick={addOrderItem}>
						<Plus class="w-4 h-4 mr-1" />
						Add Item
					</Button>
				</div>

				{#each formData.orderItemIds as itemId, index}
					<div class="flex items-end gap-2 p-3 border rounded-lg">
						<div class="flex-1 space-y-2">
							<Label for="item-{index}">Item</Label>
							<select
								id="item-{index}"
								bind:value={formData.orderItemIds[index]}
								required
								class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							>
								<option value="" disabled>Select an item</option>
								{#if isLoadingItems}
									<option value="" disabled>Loading items...</option>
								{:else if items.length === 0}
									<option value="" disabled>No items available</option>
								{:else}
									{#each items as item}
										<option value={item.Id}>{item.Name} - GH₵ {item.Price}</option>
									{/each}
								{/if}
							</select>
						</div>

						{#if formData.orderItemIds.length > 1}
							<Button
								type="button"
								size="icon"
								variant="ghost"
								onclick={() => removeOrderItem(index)}
								class="text-destructive hover:bg-destructive/10"
							>
								<Trash2 class="w-4 h-4" />
							</Button>
						{/if}
					</div>
				{/each}
			</div>

			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={onClose}>Cancel</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Updating...' : 'Update Order'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
