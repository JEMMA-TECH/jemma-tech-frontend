<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { onMount } from "svelte";

	let className: string | undefined = undefined;
	export { className as class };

	let open = false;
	let trigger: HTMLElement;
	let content: HTMLElement;

	export function toggle() {
		open = !open;
	}

	export function close() {
		open = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (open && trigger && content && !trigger.contains(event.target as Node) && !content.contains(event.target as Node)) {
			close();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class={cn("relative", className)}>
	<slot {open} {toggle} {close} />
</div>