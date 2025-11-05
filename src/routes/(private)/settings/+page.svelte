<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Redirect to the first settings page
	onMount(() => {
		goto('/settings/services');
	});
</script>

<svelte:head>
	<title>Settings - JEMMA</title>
</svelte:head>

<div class="flex items-center justify-center min-h-[400px]">
	<p class="text-muted-foreground">Loading settings...</p>
</div>
