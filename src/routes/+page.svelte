<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { pref } from '$lib/common/local-storage';

	onMount(() => {
		const token = pref.get('@jemma/access');
		if (token) {
			goto('/private/dashboard');
		} else {
			goto('/init');
		}
	});
</script>

<svelte:head>
	<title>JEMMA Laundry Management</title>
	<meta name="description" content="Professional laundry management system" />
</svelte:head>

<div class="min-h-screen bg-background flex items-center justify-center">
	<div class="text-center">
		<h1 class="text-4xl font-bold mb-4">JEMMA Laundry</h1>
		<p class="text-muted-foreground">Loading...</p>
	</div>
</div>
