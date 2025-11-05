<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-svelte';
	import type { Employee } from '$svc/employees/employees.types';
	import { createEventDispatcher } from 'svelte';

	let { employee }: { employee: Employee } = $props();

	const dispatch = createEventDispatcher();

	function handleView() {
		dispatch('view', employee);
	}

	function handleEdit() {
		dispatch('edit', employee);
	}

	function handleDelete() {
		dispatch('delete', employee);
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label>Actions</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={handleView}>
			<Eye class="mr-2 h-4 w-4" />
			<span>View Details</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={handleEdit}>
			<Pencil class="mr-2 h-4 w-4" />
			<span>Edit</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item onclick={handleDelete} class="text-destructive">
			<Trash2 class="mr-2 h-4 w-4" />
			<span>Delete</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
