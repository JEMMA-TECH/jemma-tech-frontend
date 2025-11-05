<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { Service } from '$svc/services/services.types';
	import { Ellipsis, Edit, Trash2, Copy } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import DeleteServiceModal from './delete-service-modal.svelte';
	import EditServiceModal from './edit-service-modal.svelte';

	let { service, onLoadData }: { service: Service; onLoadData: () => void } = $props();

	let isDeleteModalOpen = $state(false);
	let isEditModalOpen = $state(false);

	function handleCopyId() {
		navigator.clipboard.writeText(service.Id);
		toast.success('Service ID copied to clipboard!');
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline" size="icon" class="relative size-6 p-0">
				<span class="sr-only">Open menu</span>
				<Ellipsis class="h-4 w-4" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
			<DropdownMenu.Item onclick={handleCopyId}>
				<Copy class="mr-2 h-4 w-4" />
				Copy ID
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => (isEditModalOpen = true)}>
				<Edit class="mr-2 h-4 w-4" />
				Edit
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item
				onclick={() => (isDeleteModalOpen = true)}
				class="text-red-600 focus:text-red-600"
			>
				<Trash2 class="mr-2 h-4 w-4" />
				Delete
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<DeleteServiceModal
	isOpen={isDeleteModalOpen}
	{service}
	onClose={() => (isDeleteModalOpen = false)}
	onSuccess={onLoadData}
/>

<EditServiceModal
	isOpen={isEditModalOpen}
	{service}
	onClose={() => (isEditModalOpen = false)}
	onSuccess={onLoadData}
/>
