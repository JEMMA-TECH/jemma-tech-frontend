<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { pref } from '$lib/common/local-storage';

	let { children } = $props();

	onMount(() => {
		// Check if user is authenticated
		const token = pref.get('@jemma/access');
		if (!token) {
			goto('/init');
		}
	});
</script>

<div class="min-h-screen bg-background">
	{@render children?.()}
</div>