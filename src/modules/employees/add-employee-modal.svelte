<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { createEmployee } from '$svc/employees/employees.service';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), onClose, onSuccess }: ModalProps = $props();

	let formData = $state({
		firstName: '',
		lastName: '',
		email: '',
		role: '',
		isActive: true
	});

	let isSubmitting = $state(false);

	function handleOpenChange(open: boolean) {
		if (!open) {
			onClose();
			resetForm();
		}
	}

	function resetForm() {
		formData = {
			firstName: '',
			lastName: '',
			email: '',
			role: '',
			isActive: true
		};
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!formData.firstName.trim()) {
			toast.error('Please enter first name');
			return;
		}

		if (!formData.lastName.trim()) {
			toast.error('Please enter last name');
			return;
		}

		if (!formData.email.trim()) {
			toast.error('Please enter email');
			return;
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			toast.error('Please enter a valid email address');
			return;
		}

		isSubmitting = true;

		const result = await createEmployee({
			firstName: formData.firstName.trim(),
			lastName: formData.lastName.trim(),
			email: formData.email.trim(),
			role: formData.role.trim(),
			isActive: formData.isActive
		});

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Employee added successfully!');
			onSuccess();
			onClose();
			resetForm();
		} else {
			toast.error(result.Message || 'Failed to add employee');
		}
	}
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>Add New Employee</Dialog.Title>
			<Dialog.Description>Add a new team member to your company.</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<Label for="firstName">First Name *</Label>
				<Input
					id="firstName"
					bind:value={formData.firstName}
					placeholder="John"
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="lastName">Last Name *</Label>
				<Input
					id="lastName"
					bind:value={formData.lastName}
					placeholder="Doe"
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="email">Email *</Label>
				<Input
					id="email"
					type="email"
					bind:value={formData.email}
					placeholder="john.doe@example.com"
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="role">Role</Label>
				<Input
					id="role"
					bind:value={formData.role}
					placeholder="Manager, Staff, etc."
				/>
			</div>

			<div class="flex items-center space-x-2">
				<Checkbox id="isActive" bind:checked={formData.isActive} />
				<Label for="isActive" class="text-sm font-normal cursor-pointer">
					Active Employee
				</Label>
			</div>

			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={onClose}>Cancel</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Adding...' : 'Add Employee'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
