<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { getPayments } from '$svc/payments/payments.service';
	import type { Payment } from '$svc/payments/payments.types';
	import { Loader, PlusCircle, DollarSign } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { getPaymentColumns } from './payment-columns';
	import AddPaymentModal from './add-payment-modal.svelte';

	let isLoadingData = $state<boolean>(false);
	let errorMessage = $state<string | null>(null);
	let payments = $state<Payment[]>([]);
	let isAddModalOpen = $state(false);

	async function fetchPayments() {
		isLoadingData = true;
		errorMessage = null;
		try {
			console.log('Fetching payments...');
			const result = await getPayments();
			console.log('Payments result:', result);

			if (result.IsSuccess && result.Data) {
				payments = Array.isArray(result.Data) ? result.Data : [];
				console.log('Payments loaded:', payments.length);
			} else {
				errorMessage = result.Message || 'Failed to load payments.';
				toast.error(errorMessage);
				payments = [];
			}
		} catch (err) {
			console.error('Error fetching payments:', err);
			errorMessage = 'An unexpected error occurred while loading payments.';
			toast.error(errorMessage);
			payments = [];
		} finally {
			isLoadingData = false;
			console.log('Loading complete. isLoadingData:', false);
		}
	}

	onMount(fetchPayments);
</script>

<div class="min-h-auto">
	<div class="w-full space-y-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold">Payments</h1>
				<p class="text-muted-foreground mt-2">Manage customer payments</p>
			</div>
			<Button class="gap-2" onclick={() => (isAddModalOpen = true)}>
				<PlusCircle class="w-4 h-4" />
				New Payment
			</Button>
		</div>

		<!-- Data Table -->
		{#if isLoadingData}
			<div class="flex min-h-[calc(50vh-50px)] items-center justify-center">
				<Loader class="stroke-primary size-8 animate-spin" />
			</div>
		{:else if payments.length === 0}
			<div class="rounded-lg border-2 border-dashed border-border bg-card py-16 text-center">
				<DollarSign class="mx-auto h-16 w-16 text-muted-foreground" />
				<h3 class="mt-4 text-lg font-medium">No payments found</h3>
				<p class="mt-2 text-sm text-muted-foreground">
					{#if errorMessage}
						Unable to load payments. Please try again.
					{:else}
						Get started by recording your first payment.
					{/if}
				</p>
				{#if !errorMessage}
					<Button class="mt-4 gap-2" onclick={() => (isAddModalOpen = true)}>
						<PlusCircle class="h-4 w-4" />
						New Payment
					</Button>
				{/if}
			</div>
		{:else}
			<DataTable
				columns={getPaymentColumns(fetchPayments)}
				data={payments}
				searchKey="Customer"
				searchPlaceholder="Search payments by customer, payment ID..."
				enableColumnFilters={false}
				enableSorting={true}
				pageSize={10}
				onRefresh={fetchPayments}
				refreshing={isLoadingData}
			/>
		{/if}
	</div>
</div>

<AddPaymentModal
	isOpen={isAddModalOpen}
	onClose={() => (isAddModalOpen = false)}
	onSuccess={fetchPayments}
/>
