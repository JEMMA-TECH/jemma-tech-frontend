<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { createService } from '$svc/services/services.service';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), onClose, onSuccess }: ModalProps = $props();

	let formData = $state({
		name: ''
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
			name: ''
		};
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!formData.name.trim()) {
			toast.error('Please fill in the service name');
			return;
		}

		isSubmitting = true;

		const result = await createService({
			name: formData.name.trim()
		});

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Service created successfully!');
			onSuccess();
			onClose();
			resetForm();
		} else {
			toast.error(result.Message || 'Failed to create service');
		}
	}
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>Add New Service</Dialog.Title>
			<Dialog.Description>Create a new service for your company.</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<Label for="name">Service Name *</Label>
				<Input
					id="name"
					bind:value={formData.name}
					placeholder="e.g., Dry Cleaning, Washing, Ironing"
					required
				/>
			</div>

			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={onClose}>Cancel</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Creating...' : 'Create Service'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
