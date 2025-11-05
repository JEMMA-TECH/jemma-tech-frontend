<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import type { Employee } from '$svc/employees/employees.types';

	type ModalProps = {
		isOpen: boolean;
		employee: Employee;
		onClose: () => void;
	};

	let { isOpen = $bindable(), employee, onClose }: ModalProps = $props();

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content class="max-w-2xl">
		<Dialog.Header>
			<Dialog.Title>Employee Details</Dialog.Title>
			<Dialog.Description>View complete employee information</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-6">
			<!-- Employee Info -->
			<div class="grid grid-cols-2 gap-4">
				<div>
					<p class="text-sm text-muted-foreground">First Name</p>
					<p class="font-medium">{employee.FirstName}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Last Name</p>
					<p class="font-medium">{employee.LastName}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Email</p>
					<p class="font-medium">{employee.Email}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Role</p>
					<p class="font-medium">{employee.Role || 'N/A'}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Status</p>
					<Badge class={employee.IsActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
						{employee.IsActive ? 'Active' : 'Inactive'}
					</Badge>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Employee ID</p>
					<p class="font-medium">#{employee.Id.substring(0, 8)}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Created At</p>
					<p class="font-medium">{formatDate(employee.CreatedAt)}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground">Updated At</p>
					<p class="font-medium">{formatDate(employee.UpdatedAt)}</p>
				</div>
			</div>
		</div>

		<Dialog.Footer class="mt-6">
			<Button onclick={onClose}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
