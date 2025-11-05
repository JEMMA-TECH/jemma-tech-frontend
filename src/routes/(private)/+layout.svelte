<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { pref } from '$lib/common/local-storage';
	import AppSidebar from "$lib/components/AppSidebar.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar";

	let { children } = $props();

	onMount(() => {
		// Check if user is authenticated
		const token = pref.get('@jemma/access');
		if (!token) {
			goto('/init');
		}
	});
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<main class="flex-1 overflow-auto bg-muted/50">
			<div class="container mx-auto p-6">
				{@render children?.()}
			</div>
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>