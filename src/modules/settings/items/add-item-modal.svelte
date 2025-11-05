<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { createItem } from '$svc/items/items.service';
	import { getServices } from '$svc/services/services.service';
	import type { Service } from '$svc/services/services.types';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), onClose, onSuccess }: ModalProps = $props();

	let formData = $state({
		name: '',
		price: 0,
		serviceId: ''
	});

	let services = $state<Service[]>([]);
	let isLoadingServices = $state(false);
	let isSubmitting = $state(false);

	async function loadServices() {
		isLoadingServices = true;
		const result = await getServices();
		if (result.IsSuccess && result.Data) {
			services = Array.isArray(result.Data) ? result.Data : [];
		}
		isLoadingServices = false;
	}

	$effect(() => {
		if (isOpen) {
			loadServices();
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
			name: '',
			price: 0,
			serviceId: ''
		};
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!formData.name.trim()) {
			toast.error('Please fill in the item name');
			return;
		}

		if (!formData.price || formData.price <= 0) {
			toast.error('Please enter a valid price');
			return;
		}

		if (!formData.serviceId) {
			toast.error('Please select a service');
			return;
		}

		isSubmitting = true;

		const result = await createItem({
			name: formData.name.trim(),
			price: formData.price,
			serviceId: formData.serviceId
		});

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Item created successfully!');
			onSuccess();
			onClose();
			resetForm();
		} else {
			toast.error(result.Message || 'Failed to create item');
		}
	}
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>Add New Item</Dialog.Title>
			<Dialog.Description>Create a new item for your services.</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<Label for="name">Item Name *</Label>
				<Input
					id="name"
					bind:value={formData.name}
					placeholder="e.g., Shirt, Trousers, Bedsheet"
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="price">Price (GH₵) *</Label>
				<Input
					id="price"
					type="number"
					bind:value={formData.price}
					placeholder="0.00"
					min="1"
					step="0.01"
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="service">Service *</Label>
				<select
					id="service"
					bind:value={formData.serviceId}
					required
					class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					<option value="" disabled selected>Select a service</option>
					{#if isLoadingServices}
						<option value="" disabled>Loading services...</option>
					{:else if services.length === 0}
						<option value="" disabled>No services available</option>
					{:else}
						{#each services as service}
							<option value={service.Id}>{service.Name}</option>
						{/each}
					{/if}
				</select>
			</div>

			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={onClose}>Cancel</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Creating...' : 'Create Item'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
