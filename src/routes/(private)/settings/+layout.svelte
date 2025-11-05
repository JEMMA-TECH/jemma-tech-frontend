<script lang="ts">
	import { page } from '$app/stores';
	import { Shirt, Package, UserPlus, Lock } from 'lucide-svelte';

	const settingsGroups = [
		{
			id: 'services',
			title: 'Services',
			href: '/settings/services',
			icon: Shirt
		},
		{
			id: 'items',
			title: 'Items',
			href: '/settings/items',
			icon: Package
		},
		{
			id: 'invites',
			title: 'Invites',
			href: '/settings/invites',
			icon: UserPlus
		}
	];

	function isActive(href: string, currentPath: string) {
		return currentPath === href;
	}

	let { children } = $props();
</script>

<div class="p-6">
	<div class="space-y-6">
		<div>
			<h1 class="text-3xl font-bold">Settings</h1>
			<p class="text-muted-foreground mt-2">Manage your laundry business settings</p>
		</div>
		<div class="border-b border-border"></div>

		<div class="flex gap-8 max-w-screen-2xl mx-auto">
			<!-- Left Navigation -->
			<div class="w-64 flex-shrink-0">
				<div class="sticky top-8">
					<h3 class="text-sm font-semibold mb-4">Settings</h3>
					<nav class="space-y-1">
						{#each settingsGroups as group}
							{@const Icon = group.icon}
							<a
								href={group.href}
								class="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors {isActive(
									group.href,
									$page.url.pathname
								)
									? 'text-teal-700 bg-teal-50 font-medium'
									: 'text-muted-foreground hover:text-foreground hover:bg-accent'}"
							>
								<Icon class="w-4 h-4" />
								{group.title}
							</a>
						{/each}
					</nav>
				</div>
			</div>

			<!-- Main Content -->
			<div class="flex-1 max-w-4xl">
				{@render children?.()}
			</div>
		</div>
	</div>
</div>
