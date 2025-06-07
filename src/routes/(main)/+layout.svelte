<script>
	import Sidebar from './_components/sidebar.svelte';

	const { children } = $props();
</script>

<div class="flex">
	<Sidebar />
	<div class="relative h-full w-full overflow-y-auto lg:ml-64">
		{@render children()}
	</div>
</div>
