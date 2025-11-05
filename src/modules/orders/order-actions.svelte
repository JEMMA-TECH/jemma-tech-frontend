<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Ellipsis, Eye, Pencil, Trash2 } from 'lucide-svelte';
	import type { Order } from '$svc/orders/orders.types';
	import ViewOrderModal from './view-order-modal.svelte';
	import EditOrderModal from './edit-order-modal.svelte';
	import DeleteOrderModal from './delete-order-modal.svelte';

	let { order, onLoadData }: { order: Order; onLoadData: () => void } = $props();

	let isViewModalOpen = $state(false);
	let isEditModalOpen = $state(false);
	let isDeleteModalOpen = $state(false);
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
			<DropdownMenu.Item onclick={() => (isViewModalOpen = true)}>
				<Eye class="mr-2 h-4 w-4" />
				View Details
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => (isEditModalOpen = true)}>
				<Pencil class="mr-2 h-4 w-4" />
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

<ViewOrderModal isOpen={isViewModalOpen} {order} onClose={() => (isViewModalOpen = false)} />

<EditOrderModal
	isOpen={isEditModalOpen}
	{order}
	onClose={() => (isEditModalOpen = false)}
	onSuccess={onLoadData}
/>

<DeleteOrderModal
	isOpen={isDeleteModalOpen}
	{order}
	onClose={() => (isDeleteModalOpen = false)}
	onSuccess={onLoadData}
/>
