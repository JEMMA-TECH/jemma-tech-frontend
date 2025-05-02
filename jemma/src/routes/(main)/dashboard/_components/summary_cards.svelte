<script lang="ts">
	type CardProps = {
		title: string;
		value: string;
		icon: string;
	};
	const { title, value, icon }: CardProps = $props();

	let bgColor = 'bg-gray-100'; // Default background colorƒ
</script>

<div class={`summary-card rounded-lg p-4 shadow-md ${bgColor} flex items-center`}>
	<div class="flex items-start gap-5">
		{#if icon}
			<div class="icon-container">
				<p class="text-4xl">{icon}</p>
			</div>
		{/if}
		<div class="space-y-1.5">
			<h3 class="text-sm font-semibold tracking-wide text-neutral-500 uppercase">{title}</h3>
			<p class="text-3xl font-bold">{value}</p>
		</div>
	</div>
</div>

<style>
	.summary-card {
		transition: transform 0.2s ease-in-out;
	}
	.summary-card:hover {
		transform: translateY(-5px);
	}
</style>
