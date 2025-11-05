<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { getEmployees } from '$svc/employees/employees.service';
	import type { Employee } from '$svc/employees/employees.types';
	import { Loader, PlusCircle, Users } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { getEmployeeColumns } from './employee-columns';
	import AddEmployeeModal from './add-employee-modal.svelte';
	import EditEmployeeModal from './edit-employee-modal.svelte';
	import DeleteEmployeeModal from './delete-employee-modal.svelte';
	import ViewEmployeeModal from './view-employee-modal.svelte';

	let isLoadingData = $state<boolean>(false);
	let errorMessage = $state<string | null>(null);
	let employees = $state<Employee[]>([]);
	let isAddModalOpen = $state(false);
	let isEditModalOpen = $state(false);
	let isDeleteModalOpen = $state(false);
	let isViewModalOpen = $state(false);
	let selectedEmployee = $state<Employee | null>(null);

	async function fetchEmployees() {
		isLoadingData = true;
		errorMessage = null;
		try {
			const result = await getEmployees();

			if (result.IsSuccess && result.Data) {
				employees = Array.isArray(result.Data) ? result.Data : [];
			} else {
				errorMessage = result.Message || 'Failed to load employees.';
				toast.error(errorMessage);
				employees = [];
			}
		} catch (err) {
			console.error('Error fetching employees:', err);
			errorMessage = 'An unexpected error occurred while loading employees.';
			toast.error(errorMessage);
			employees = [];
		} finally {
			isLoadingData = false;
		}
	}

	function handleView(event: CustomEvent<Employee>) {
		selectedEmployee = event.detail;
		isViewModalOpen = true;
	}

	function handleEdit(event: CustomEvent<Employee>) {
		selectedEmployee = event.detail;
		isEditModalOpen = true;
	}

	function handleDelete(event: CustomEvent<Employee>) {
		selectedEmployee = event.detail;
		isDeleteModalOpen = true;
	}

	onMount(fetchEmployees);
</script>

<div class="min-h-auto">
	<div class="w-full space-y-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold">Employees</h1>
				<p class="text-muted-foreground mt-2">Manage your team members</p>
			</div>
			<Button class="gap-2" onclick={() => (isAddModalOpen = true)}>
				<PlusCircle class="w-4 h-4" />
				Add Employee
			</Button>
		</div>

		<!-- Data Table -->
		{#if isLoadingData}
			<div class="flex items-center justify-center py-12">
				<Loader class="w-8 h-8 animate-spin text-muted-foreground" />
			</div>
		{:else if errorMessage}
			<div class="text-center py-12">
				<Users class="w-12 h-12 text-muted-foreground mx-auto mb-3" />
				<p class="text-destructive">{errorMessage}</p>
				<Button class="mt-4" onclick={fetchEmployees}>Try Again</Button>
			</div>
		{:else}
			<DataTable
				data={employees}
				columns={getEmployeeColumns()}
				on:view={handleView}
				on:edit={handleEdit}
				on:delete={handleDelete}
			/>
		{/if}
	</div>
</div>

<AddEmployeeModal
	isOpen={isAddModalOpen}
	onClose={() => (isAddModalOpen = false)}
	onSuccess={fetchEmployees}
/>

{#if selectedEmployee}
	<ViewEmployeeModal
		isOpen={isViewModalOpen}
		employee={selectedEmployee}
		onClose={() => (isViewModalOpen = false)}
	/>

	<EditEmployeeModal
		isOpen={isEditModalOpen}
		employee={selectedEmployee}
		onClose={() => (isEditModalOpen = false)}
		onSuccess={fetchEmployees}
	/>

	<DeleteEmployeeModal
		isOpen={isDeleteModalOpen}
		employee={selectedEmployee}
		onClose={() => (isDeleteModalOpen = false)}
		onSuccess={fetchEmployees}
	/>
{/if}
