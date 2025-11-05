<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { updateCustomer } from '$svc/customers/customers.service';
	import type { Customer } from '$svc/customers/customers.types';
	import { Loader } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		customer: Customer;
		onClose: () => void;
		onLoadData: () => void;
	};

	let { isOpen = $bindable(), customer, onClose, onLoadData }: ModalProps = $props();

	let formData = $state({
		firstName: customer.FirstName,
		lastName: customer.LastName,
		email: customer.Email,
		phoneNumber: customer.PhoneNumber
	});

	let isSubmitting = $state(false);

	let formValid = $derived(
		formData.firstName.trim() !== '' &&
			formData.lastName.trim() !== '' &&
			formData.email.trim() !== '' &&
			formData.phoneNumber.trim() !== ''
	);

	// Update form data when customer prop changes
	$effect(() => {
		if (customer) {
			formData = {
				firstName: customer.FirstName,
				lastName: customer.LastName,
				email: customer.Email,
				phoneNumber: customer.PhoneNumber
			};
		}
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!formValid) return;

		isSubmitting = true;
		try {
			const result = await updateCustomer(customer.Id, formData);

			if (result.IsSuccess) {
				toast.success(result.Message || 'Customer updated successfully!');
				onClose();
				onLoadData();
			} else {
				toast.error(result.Message || 'Failed to update customer');
			}
		} catch (error) {
			toast.error('An unexpected error occurred');
			console.error('Update customer error:', error);
		} finally {
			isSubmitting = false;
		}
	}

	function handleOpenChange(open: boolean) {
		if (!open) {
			onClose();
		}
	}
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>Edit Customer</Dialog.Title>
			<Dialog.Description>Update customer information.</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="space-y-4 mt-4">
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="grid gap-2">
					<Label for="edit-firstName">First Name <span class="text-red-500">*</span></Label>
					<Input
						id="edit-firstName"
						type="text"
						placeholder="John"
						bind:value={formData.firstName}
						disabled={isSubmitting}
						required
					/>
				</div>

				<div class="grid gap-2">
					<Label for="edit-lastName">Last Name <span class="text-red-500">*</span></Label>
					<Input
						id="edit-lastName"
						type="text"
						placeholder="Doe"
						bind:value={formData.lastName}
						disabled={isSubmitting}
						required
					/>
				</div>
			</div>

			<div class="grid gap-2">
				<Label for="edit-email">Email <span class="text-red-500">*</span></Label>
				<Input
					id="edit-email"
					type="email"
					placeholder="john.doe@example.com"
					bind:value={formData.email}
					disabled={isSubmitting}
					required
				/>
			</div>

			<div class="grid gap-2">
				<Label for="edit-phoneNumber">Phone Number <span class="text-red-500">*</span></Label>
				<Input
					id="edit-phoneNumber"
					type="tel"
					placeholder="+1 234 567 8900"
					bind:value={formData.phoneNumber}
					disabled={isSubmitting}
					required
				/>
			</div>

			<Dialog.Footer class="mt-6">
				<Button type="button" variant="outline" onclick={onClose} disabled={isSubmitting}>
					Cancel
				</Button>
				<Button type="submit" disabled={!formValid || isSubmitting}>
					{#if isSubmitting}
						<Loader class="mr-2 h-4 w-4 animate-spin" />
						Updating...
					{:else}
						Update Customer
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
