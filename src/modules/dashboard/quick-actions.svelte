<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import {
		Plus,
		Package,
		Users,
		DollarSign,
		ShoppingCart,
		UserPlus,
		Receipt
	} from 'lucide-svelte';

	const quickActions = [
		{
			title: 'New Order',
			description: 'Create a new laundry order',
			icon: Package,
			color: 'bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400',
			action: () => (window.location.href = '/orders?add=true')
		},
		{
			title: 'Add Customer',
			description: 'Register a new customer',
			icon: UserPlus,
			color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
			action: () => (window.location.href = '/customers?add=true')
		},
		{
			title: 'View Orders',
			description: 'See all orders',
			icon: ShoppingCart,
			color: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
			action: () => (window.location.href = '/orders')
		},
		{
			title: 'View Customers',
			description: 'See all customers',
			icon: Users,
			color: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
			action: () => (window.location.href = '/customers')
		}
	];
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="flex items-center gap-2">
			<Plus class="h-5 w-5" />
			Quick Actions
		</Card.Title>
		<Card.Description>Frequently used actions for faster workflow</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col sm:flex-row gap-3">
			{#each quickActions as action}
				{@const Icon = action.icon}
				<button
					onclick={action.action}
					class="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 text-left group flex-1"
				>
					<div class="{action.color} p-3 rounded-lg group-hover:scale-110 transition-transform">
						<Icon class="h-5 w-5" />
					</div>
					<div class="flex-1">
						<h4 class="font-semibold text-sm mb-1">{action.title}</h4>
						<p class="text-xs text-muted-foreground">{action.description}</p>
					</div>
				</button>
			{/each}
		</div>
	</Card.Content>
</Card.Root>
