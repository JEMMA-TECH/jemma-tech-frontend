<script lang="ts">
	import '../app.css';
	import {Toast} from "flowbite-svelte";

	let { children } = $props();
</script>

<Toast position="top-right"/>
{@render children()}
