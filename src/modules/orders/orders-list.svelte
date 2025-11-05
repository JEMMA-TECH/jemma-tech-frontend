<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { getOrders } from '$svc/orders/orders.service';
	import type { Order } from '$svc/orders/orders.types';
	import { Loader, PlusCircle, ShoppingCart } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { getOrderColumns } from './order-columns';
	import AddOrderModal from './add-order-modal.svelte';

	let isLoadingData = $state<boolean>(false);
	let errorMessage = $state<string | null>(null);
	let orders = $state<Order[]>([]);
	let isAddModalOpen = $state(false);

	async function fetchOrders() {
		isLoadingData = true;
		errorMessage = null;
		try {
			console.log('Fetching orders...');
			const result = await getOrders();
			console.log('Orders result:', result);

			if (result.IsSuccess && result.Data) {
				orders = Array.isArray(result.Data) ? result.Data : [];
				console.log('Orders loaded:', orders.length);
			} else {
				errorMessage = result.Message || 'Failed to load orders.';
				toast.error(errorMessage);
				orders = [];
			}
		} catch (err) {
			console.error('Error fetching orders:', err);
			errorMessage = 'An unexpected error occurred while loading orders.';
			toast.error(errorMessage);
			orders = [];
		} finally {
			isLoadingData = false;
			console.log('Loading complete. isLoadingData:', false);
		}
	}

	onMount(fetchOrders);
</script>

<div class="min-h-auto">
	<div class="w-full space-y-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold">Orders</h1>
				<p class="text-muted-foreground mt-2">Manage your laundry orders</p>
			</div>
			<Button class="gap-2" onclick={() => (isAddModalOpen = true)}>
				<PlusCircle class="w-4 h-4" />
				New Order
			</Button>
		</div>

		<!-- Data Table -->
		{#if isLoadingData}
			<div class="flex min-h-[calc(50vh-50px)] items-center justify-center">
				<Loader class="stroke-primary size-8 animate-spin" />
			</div>
		{:else if orders.length === 0}
			<div class="rounded-lg border-2 border-dashed border-border bg-card py-16 text-center">
				<ShoppingCart class="mx-auto h-16 w-16 text-muted-foreground" />
				<h3 class="mt-4 text-lg font-medium">No orders found</h3>
				<p class="mt-2 text-sm text-muted-foreground">
					{#if errorMessage}
						Unable to load orders. Please try again.
					{:else}
						Get started by creating your first order.
					{/if}
				</p>
				{#if !errorMessage}
					<Button class="mt-4 gap-2" onclick={() => (isAddModalOpen = true)}>
						<PlusCircle class="h-4 w-4" />
						New Order
					</Button>
				{/if}
			</div>
		{:else}
			<DataTable
				columns={getOrderColumns(fetchOrders)}
				data={orders}
				searchKey="Customer"
				searchPlaceholder="Search orders by customer, order ID..."
				enableColumnFilters={false}
				enableSorting={true}
				pageSize={10}
				onRefresh={fetchOrders}
				refreshing={isLoadingData}
			/>
		{/if}
	</div>
</div>

<AddOrderModal
	isOpen={isAddModalOpen}
	onClose={() => (isAddModalOpen = false)}
	onSuccess={fetchOrders}
/>
