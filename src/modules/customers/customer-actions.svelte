<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { Customer } from '$svc/customers/customers.types';
	import { Ellipsis, Edit, Trash2, Copy, Eye } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import DeleteCustomerModal from './delete-customer-modal.svelte';
	import EditCustomerModal from './edit-customer-modal.svelte';
	import ViewCustomerModal from './view-customer-modal.svelte';

	let {
		customer,
		onLoadData
	}: { customer: Customer; onLoadData: () => void } = $props();

	let isDeleteModalOpen = $state(false);
	let isEditModalOpen = $state(false);
	let isViewModalOpen = $state(false);

	function handleCopyId() {
		navigator.clipboard.writeText(customer.Id);
		toast.success('Customer ID copied to clipboard!');
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
			<DropdownMenu.Item onclick={() => (isViewModalOpen = true)}>
				<Eye class="mr-2 h-4 w-4" />
				View Details
			</DropdownMenu.Item>
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

<ViewCustomerModal
	isOpen={isViewModalOpen}
	{customer}
	onClose={() => (isViewModalOpen = false)}
/>

<DeleteCustomerModal
	isOpen={isDeleteModalOpen}
	{customer}
	onClose={() => (isDeleteModalOpen = false)}
	{onLoadData}
/>

<EditCustomerModal
	isOpen={isEditModalOpen}
	{customer}
	onClose={() => (isEditModalOpen = false)}
	{onLoadData}
/>
