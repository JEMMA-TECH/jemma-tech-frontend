<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Package, Users, DollarSign, TrendingUp } from "lucide-svelte";

	// Sample data - will be replaced with API calls
	let stats = $state({
		totalOrders: 45,
		totalCustomers: 28,
		revenue: 1250.00,
		growth: 12.5
	});

	let recentOrders = $state([
		{ id: "ORD-001", customer: "John Doe", status: "Pending", amount: 45.00 },
		{ id: "ORD-002", customer: "Jane Smith", status: "In Progress", amount: 30.00 },
		{ id: "ORD-003", customer: "Bob Johnson", status: "Completed", amount: 75.00 }
	]);

	function getStatusColor(status: string) {
		switch(status) {
			case 'Pending': return 'bg-yellow-50 text-yellow-700';
			case 'In Progress': return 'bg-blue-50 text-blue-700';
			case 'Completed': return 'bg-green-50 text-green-700';
			default: return 'bg-gray-50 text-gray-700';
		}
	}
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold">Dashboard</h1>
		<p class="text-muted-foreground mt-2">Welcome back! Here's what's happening today.</p>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Orders</Card.Title>
				<Package class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{stats.totalOrders}</div>
				<p class="text-xs text-muted-foreground mt-1">+2 from yesterday</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Customers</Card.Title>
				<Users class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{stats.totalCustomers}</div>
				<p class="text-xs text-muted-foreground mt-1">+5 this month</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Revenue</Card.Title>
				<DollarSign class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">${stats.revenue.toFixed(2)}</div>
				<p class="text-xs text-muted-foreground mt-1">This month</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Growth</Card.Title>
				<TrendingUp class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+{stats.growth}%</div>
				<p class="text-xs text-muted-foreground mt-1">Compared to last month</p>
			</Card.Content>
		</Card.Root>
	</div>

	<!-- Recent Orders -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Recent Orders</Card.Title>
			<Card.Description>Latest orders from your customers</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="space-y-4">
				{#each recentOrders as order}
					<div class="flex items-center justify-between p-3 rounded-lg border">
						<div class="flex-1">
							<p class="font-medium">{order.id}</p>
							<p class="text-sm text-muted-foreground">{order.customer}</p>
						</div>
						<div class="flex items-center gap-4">
							<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {getStatusColor(order.status)}">
								{order.status}
							</span>
							<p class="font-medium">${order.amount.toFixed(2)}</p>
						</div>
					</div>
				{/each}
			</div>
		</Card.Content>
	</Card.Root>
</div>
