<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Plus, Edit2, Trash2, Loader2, FolderX } from "lucide-svelte";
	import { getServices } from "$svc/services/services.service";
	import type { Service } from "$svc/services/services.types";
	import AddServiceModal from "$modules/settings/services/add-service-modal.svelte";
	import EditServiceModal from "$modules/settings/services/edit-service-modal.svelte";
	import DeleteServiceModal from "$modules/settings/services/delete-service-modal.svelte";

	let services = $state<Service[]>([]);
	let isLoadingData = $state(false);
	let isAddModalOpen = $state(false);
	let isEditModalOpen = $state(false);
	let isDeleteModalOpen = $state(false);
	let selectedService = $state<Service | null>(null);

	async function fetchServices() {
		isLoadingData = true;
		const result = await getServices();
		if (result.IsSuccess && result.Data) {
			services = Array.isArray(result.Data) ? result.Data : [];
		} else {
			services = [];
		}
		isLoadingData = false;
	}

	function handleEdit(service: Service) {
		selectedService = service;
		isEditModalOpen = true;
	}

	function handleDelete(service: Service) {
		selectedService = service;
		isDeleteModalOpen = true;
	}

	$effect(() => {
		fetchServices();
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold">Services</h2>
			<p class="text-muted-foreground mt-1">Manage your laundry services and pricing</p>
		</div>
		<Button class="gap-2" onclick={() => (isAddModalOpen = true)}>
			<Plus class="w-4 h-4" />
			Add Service
		</Button>
	</div>

	<Card.Root>
		<Card.Header>
			<Card.Title>Service Management</Card.Title>
			<Card.Description>Configure the services you offer to your customers</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if isLoadingData}
				<div class="text-center py-12">
					<Loader2 class="w-8 h-8 text-muted-foreground mx-auto mb-3 animate-spin" />
					<p class="text-sm text-muted-foreground">Loading services...</p>
				</div>
			{:else if services.length === 0}
				<div class="text-center py-12">
					<FolderX class="w-12 h-12 text-muted-foreground mx-auto mb-3" />
					<p class="text-muted-foreground">No services configured yet.</p>
					<p class="text-sm text-muted-foreground mt-2">Click "Add Service" to get started.</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					{#each services as service (service.Id)}
						<div
							class="flex items-start justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
						>
							<div class="flex-1 min-w-0">
								<h3 class="text-sm font-semibold">{service.Name}</h3>
							</div>
							<div class="flex items-center gap-2 ml-3">
								<button
									onclick={() => handleEdit(service)}
									class="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
									title="Edit"
								>
									<Edit2 class="w-4 h-4" />
								</button>
								<button
									onclick={() => handleDelete(service)}
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

<AddServiceModal
	isOpen={isAddModalOpen}
	onClose={() => (isAddModalOpen = false)}
	onSuccess={fetchServices}
/>

{#if selectedService}
	<EditServiceModal
		isOpen={isEditModalOpen}
		service={selectedService}
		onClose={() => (isEditModalOpen = false)}
		onSuccess={fetchServices}
	/>

	<DeleteServiceModal
		isOpen={isDeleteModalOpen}
		service={selectedService}
		onClose={() => (isDeleteModalOpen = false)}
		onSuccess={fetchServices}
	/>
{/if}
