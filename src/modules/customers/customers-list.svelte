<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { getCustomers } from '$svc/customers/customers.service';
	import type { Customer } from '$svc/customers/customers.types';
	import { Loader, PlusCircle, Users } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { getCustomerColumns } from './customer-columns';
	import AddCustomerModal from './add-customer-modal.svelte';
	import { page } from '$app/stores';

	let isLoadingData = $state<boolean>(false);
	let errorMessage = $state<string | null>(null);
	let customers = $state<Customer[]>([]);
	let isAddCustomerModalOpen = $state(false);

	async function fetchCustomers() {
		isLoadingData = true;
		errorMessage = null;
		try {
			console.log('Fetching customers...');
			const result = await getCustomers();
			console.log('Customers result:', result);

			if (result.IsSuccess && result.Data) {
				// API returns array directly in Data, not Data.Items
				customers = Array.isArray(result.Data) ? result.Data : [];
				console.log('Customers loaded:', customers.length);
			} else {
				errorMessage = result.Message || 'Failed to load customers.';
				toast.error(errorMessage);
				customers = []; // Set to empty array on error
			}
		} catch (err) {
			console.error('Error fetching customers:', err);
			errorMessage = 'An unexpected error occurred while loading customers.';
			toast.error(errorMessage);
			customers = []; // Set to empty array on error
		} finally {
			isLoadingData = false;
			console.log('Loading complete. isLoadingData:', false);
		}
	}

	onMount(() => {
		fetchCustomers();
		// Check if we should auto-open the add modal
		if ($page.url.searchParams.get('add') === 'true') {
			isAddCustomerModalOpen = true;
		}
	});
</script>

<div class="min-h-auto">
	<div class="w-full space-y-6">
		<!-- Header -->
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h3 class="text-2xl font-bold tracking-tight">Customers</h3>
				<p class="text-sm text-muted-foreground mt-1">
					Manage your customer database. Add, edit, or remove customers.
				</p>
			</div>

			<Button onclick={() => (isAddCustomerModalOpen = true)}>
				<PlusCircle class="h-4 w-4 sm:mr-2" />
				<span class="hidden sm:inline">Add Customer</span>
			</Button>
		</div>

		<!-- Content Section -->
		{#if isLoadingData}
			<div class="flex min-h-[calc(50vh-50px)] items-center justify-center">
				<Loader class="stroke-primary size-8 animate-spin" />
			</div>
		{:else if customers.length === 0}
			<div class="rounded-lg border-2 border-dashed border-border bg-card py-16 text-center">
				<Users class="mx-auto h-16 w-16 text-muted-foreground" />
				<h3 class="mt-4 text-lg font-medium">No customers found</h3>
				<p class="mt-2 text-sm text-muted-foreground">
					{#if errorMessage}
						Unable to load customers. Please try again.
					{:else}
						Get started by adding your first customer.
					{/if}
				</p>
				{#if !errorMessage}
					<Button class="mt-4 gap-2" onclick={() => (isAddCustomerModalOpen = true)}>
						<PlusCircle class="h-4 w-4" />
						Add Customer
					</Button>
				{/if}
			</div>
		{:else}
			<DataTable
				columns={getCustomerColumns(fetchCustomers)}
				data={customers}
				searchKey="FirstName"
				searchPlaceholder="Search customers by name, email, or phone..."
				enableColumnFilters={false}
				enableSorting={true}
				pageSize={10}
				onRefresh={fetchCustomers}
				refreshing={isLoadingData}
			/>
		{/if}
	</div>

	<AddCustomerModal
		isOpen={isAddCustomerModalOpen}
		onClose={() => (isAddCustomerModalOpen = false)}
		onLoadData={fetchCustomers}
	/>
</div>
