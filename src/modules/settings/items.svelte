<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Plus, Edit2, Trash2, Loader2, PackageX } from "lucide-svelte";
	import { getItems } from "$svc/items/items.service";
	import type { Item } from "$svc/items/items.types";
	import AddItemModal from "$modules/settings/items/add-item-modal.svelte";
	import EditItemModal from "$modules/settings/items/edit-item-modal.svelte";
	import DeleteItemModal from "$modules/settings/items/delete-item-modal.svelte";

	let items = $state<Item[]>([]);
	let isLoadingData = $state(false);
	let isAddModalOpen = $state(false);
	let isEditModalOpen = $state(false);
	let isDeleteModalOpen = $state(false);
	let selectedItem = $state<Item | null>(null);

	async function fetchItems() {
		isLoadingData = true;
		const result = await getItems();
		if (result.IsSuccess && result.Data) {
			items = Array.isArray(result.Data) ? result.Data : [];
		} else {
			items = [];
		}
		isLoadingData = false;
	}

	function handleEdit(item: Item) {
		selectedItem = item;
		isEditModalOpen = true;
	}

	function handleDelete(item: Item) {
		selectedItem = item;
		isDeleteModalOpen = true;
	}

	$effect(() => {
		fetchItems();
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold">Items</h2>
			<p class="text-muted-foreground mt-1">Manage laundry items and their pricing</p>
		</div>
		<Button class="gap-2" onclick={() => (isAddModalOpen = true)}>
			<Plus class="w-4 h-4" />
			Add Item
		</Button>
	</div>

	<Card.Root>
		<Card.Header>
			<Card.Title>Item Management</Card.Title>
			<Card.Description>Configure the types of items you accept for laundry</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if isLoadingData}
				<div class="text-center py-12">
					<Loader2 class="w-8 h-8 text-muted-foreground mx-auto mb-3 animate-spin" />
					<p class="text-sm text-muted-foreground">Loading items...</p>
				</div>
			{:else if items.length === 0}
				<div class="text-center py-12">
					<PackageX class="w-12 h-12 text-muted-foreground mx-auto mb-3" />
					<p class="text-muted-foreground">No items configured yet.</p>
					<p class="text-sm text-muted-foreground mt-2">Click "Add Item" to get started.</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
					{#each items as item (item.Id)}
						<div
							class="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
						>
							<div class="flex-1 min-w-0">
								<h3 class="text-sm font-semibold">{item.Name}</h3>
								<p class="text-xs text-muted-foreground">
									Service: {item.Service?.Name || 'N/A'}
								</p>
							</div>
							<div class="flex items-center gap-2 ml-3">
								<button
									onclick={() => handleEdit(item)}
									class="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
									title="Edit"
								>
									<Edit2 class="w-4 h-4" />
								</button>
								<button
									onclick={() => handleDelete(item)}
									class="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
									title="Delete"
								>
									<Trash2 class="w-4 h-4" />
								</button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

<AddItemModal
	isOpen={isAddModalOpen}
	onClose={() => (isAddModalOpen = false)}
	onSuccess={fetchItems}
/>

{#if selectedItem}
	<EditItemModal
		isOpen={isEditModalOpen}
		item={selectedItem}
		onClose={() => (isEditModalOpen = false)}
		onSuccess={fetchItems}
	/>

	<DeleteItemModal
		isOpen={isDeleteModalOpen}
		item={selectedItem}
		onClose={() => (isDeleteModalOpen = false)}
		onSuccess={fetchItems}
	/>
{/if}
