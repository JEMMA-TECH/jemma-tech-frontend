<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { createPayment } from '$svc/payments/payments.service';
	import { getCustomers } from '$svc/customers/customers.service';
	import { getOrders } from '$svc/orders/orders.service';
	import type { Customer } from '$svc/customers/customers.types';
	import type { Order } from '$svc/orders/orders.types';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), onClose, onSuccess }: ModalProps = $props();

	let formData = $state({
		amount: 0,
		customerId: '',
		orderId: '',
		paymentStatus: 0
	});

	let customers = $state<Customer[]>([]);
	let orders = $state<Order[]>([]);
	let isLoadingCustomers = $state(false);
	let isLoadingOrders = $state(false);
	let isSubmitting = $state(false);

	async function loadCustomers() {
		isLoadingCustomers = true;
		const result = await getCustomers();
		if (result.IsSuccess && result.Data) {
			customers = Array.isArray(result.Data) ? result.Data : [];
		}
		isLoadingCustomers = false;
	}

	async function loadOrders() {
		isLoadingOrders = true;
		const result = await getOrders();
		if (result.IsSuccess && result.Data) {
			orders = Array.isArray(result.Data) ? result.Data : [];
		}
		isLoadingOrders = false;
	}

	$effect(() => {
		if (isOpen) {
			loadCustomers();
			loadOrders();
		}
	});

	function handleOpenChange(open: boolean) {
		if (!open) {
			onClose();
			resetForm();
		}
	}

	function resetForm() {
		formData = {
			amount: 0,
			customerId: '',
			orderId: '',
			paymentStatus: 0
		};
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!formData.customerId) {
			toast.error('Please select a customer');
			return;
		}

		if (!formData.orderId) {
			toast.error('Please select an order');
			return;
		}

		if (!formData.amount || formData.amount <= 0) {
			toast.error('Please enter a valid amount');
			return;
		}

		isSubmitting = true;

		const result = await createPayment({
			amount: formData.amount,
			customerId: formData.customerId,
			orderId: formData.orderId,
			paymentStatus: formData.paymentStatus
		});

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Payment created successfully!');
			onSuccess();
			onClose();
			resetForm();
		} else {
			toast.error(result.Message || 'Failed to create payment');
		}
	}
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>Create New Payment</Dialog.Title>
			<Dialog.Description>Record a new payment transaction.</Dialog.Description>
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
					<option value="" disabled selected>Select a customer</option>
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
				<Label for="order">Order *</Label>
				<select
					id="order"
					bind:value={formData.orderId}
					required
					class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					<option value="" disabled selected>Select an order</option>
					{#if isLoadingOrders}
						<option value="" disabled>Loading orders...</option>
					{:else if orders.length === 0}
						<option value="" disabled>No orders available</option>
					{:else}
						{#each orders as order}
							<option value={order.Id}>
								Order #{order.Id.substring(0, 8)} - GH₵ {order.TotalAmount?.toFixed(2)}
							</option>
						{/each}
					{/if}
				</select>
			</div>

			<div class="space-y-2">
				<Label for="amount">Amount (GH₵) *</Label>
				<Input
					id="amount"
					type="number"
					bind:value={formData.amount}
					placeholder="0.00"
					min="0.01"
					step="0.01"
					required
				/>
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
					{isSubmitting ? 'Creating...' : 'Create Payment'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
