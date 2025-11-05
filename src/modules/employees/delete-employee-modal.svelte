<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { Employee } from '$svc/employees/employees.types';
	import { deleteEmployee } from '$svc/employees/employees.service';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		employee: Employee;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), employee, onClose, onSuccess }: ModalProps = $props();

	let isSubmitting = $state(false);

	async function handleDelete() {
		isSubmitting = true;

		const result = await deleteEmployee(employee.Id);

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Employee deleted successfully!');
			onSuccess();
			onClose();
		} else {
			toast.error(result.Message || 'Failed to delete employee');
		}
	}
</script>

<AlertDialog.Root bind:open={isOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Employee</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure you want to delete <strong
					>{employee.FirstName} {employee.LastName}</strong
				>? This action cannot be undone.
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
