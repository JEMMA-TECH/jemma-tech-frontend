<script lang="ts">
	import { page } from '$app/state';
	import { CheckCircle, Clock, Package, PlusCircle } from '@lucide/svelte';
	import { Badge, Button, Card, Heading } from 'flowbite-svelte';

	let activeUrl = $derived(page.url.pathname);
	let sidebarOpen = $state(false);

	const stats = [
		{ title: 'Pending Orders', value: 24, icon: Clock, color: 'text-blue-600' },
		{ title: 'In Progress', value: 15, icon: Package, color: 'text-yellow-600' },
		{ title: 'Completed Today', value: 32, icon: CheckCircle, color: 'text-green-600' }
	];

	const orders = [
		{ id: 'ORD001', customer: 'John Doe', status: 'In Progress', items: 12, due: '2025-06-08' },
		{ id: 'ORD002', customer: 'Jane Smith', status: 'Completed', items: 8, due: '2025-06-07' },
		{ id: 'ORD003', customer: 'Mike Johnson', status: 'Pending', items: 15, due: '2025-06-09' },
		{ id: 'ORD004', customer: 'Sarah Wilson', status: 'In Progress', items: 7, due: '2025-06-08' },
		{ id: 'ORD005', customer: 'David Brown', status: 'Completed', items: 11, due: '2025-06-07' }
	];

	const customers = [
		{
			id: 'CUST001',
			name: 'John Doe',
			email: 'john.doe@example.com',
			totalOrders: 12,
			lastOrder: '2025-06-05'
		},
		{
			id: 'CUST002',
			name: 'Jane Smith',
			email: 'jane.smith@example.com',
			totalOrders: 8,
			lastOrder: '2025-06-03'
		},
		{
			id: 'CUST003',
			name: 'Alex Johnson',
			email: 'alex.johnson@example.com',
			totalOrders: 15,
			lastOrder: '2025-06-01'
		},
		{
			id: 'CUST004',
			name: 'Emily Brown',
			email: 'emily.brown@example.com',
			totalOrders: 5,
			lastOrder: '2025-05-28'
		},
		{
			id: 'CUST005',
			name: 'Michael Lee',
			email: 'michael.lee@example.com',
			totalOrders: 20,
			lastOrder: '2025-06-06'
		}
	];

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function getStatusColor(status: string) {
		switch (status) {
			case 'Completed':
				return 'green';
			case 'In Progress':
				return 'yellow';
			case 'Pending':
				return 'red';
			default:
				return 'gray';
		}
	}
</script>

<div class="h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900">
	<div class="w-full p-6">
		<!-- Header -->
		<div class="mb-8">
			<Heading tag="h1" class="text-2xl font-semibold text-gray-900 dark:text-white">
				Dashboard
			</Heading>
			<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
				Overview of your laundry operations
			</p>
		</div>

		<!-- Stats Cards -->
		<div class="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each stats as stat}
				<Card
					class="border border-gray-200 bg-white p-6 shadow-none dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-500 dark:text-gray-400">
								{stat.title}
							</p>
							<p class="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
								{stat.value}
							</p>
						</div>
						<div class="rounded-full bg-gray-50 p-3 dark:bg-gray-700">
							<stat.icon class="h-6 w-6 {stat.color}" />
						</div>
					</div>
				</Card>
			{/each}
		</div>

		<!-- Recent Orders - Full Width -->
		<div class="grid grid-cols-3 gap-8">
			<div
				class="col-span-3 w-full rounded-xl border border-gray-200 bg-white shadow-none dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="p-6">
					<div class="mb-6 flex items-center justify-between">
						<div>
							<Heading tag="h2" class="text-lg font-semibold text-gray-900 dark:text-white">
								Recent Orders
							</Heading>
							<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Latest order activity</p>
						</div>
						<Button color="primary" size="sm" class="flex items-center gap-2">
							<PlusCircle class="h-4 w-4" />
							New Order
						</Button>
					</div>

					<div class="w-full overflow-x-auto">
						<table class="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead class="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
									>
										Order ID
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
									>
										Customer
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
									>
										Status
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
									>
										Items
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
									>
										Due Date
									</th>
								</tr>
							</thead>
							<tbody
								class="w-full divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"
							>
								{#each orders as order}
									<tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
										<td
											class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white"
										>
											{order.id}
										</td>
										<td
											class="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
										>
											{order.customer}
										</td>
										<td class="px-6 py-4 text-sm whitespace-nowrap">
											<Badge color={getStatusColor(order.status)} class="text-xs">
												{order.status}
											</Badge>
										</td>
										<td
											class="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
										>
											{order.items}
										</td>
										<td
											class="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
										>
											{order.due}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>

					<!-- Empty state or load more -->
					<div class="mt-6 text-center">
						<Button color="light" size="sm">View All Orders</Button>
					</div>
				</div>
			</div>

			<div
				class="col-span-3 w-full rounded-xl border border-gray-200 bg-white shadow-none dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="p-6">
					<div class="mb-6 flex items-center justify-between">
						<div>
							<Heading tag="h2" class="text-lg font-semibold text-gray-900 dark:text-white">
								Customer Overview
							</Heading>
							<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
								Manage customers on Jemma
							</p>
						</div>
						<Button color="primary" size="sm" class="flex items-center gap-2">
							<PlusCircle class="h-4 w-4" />
							Add Customer
						</Button>
					</div>

					<div class="w-full overflow-x-auto">
						<table class="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead class="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
									>
										Customer ID
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
									>
										Name
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
									>
										Email
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
									>
										Total Orders
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
									>
										Last Order
									</th>
								</tr>
							</thead>
							<tbody
								class="w-full divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"
							>
								{#each customers as customer}
									<tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
										<td
											class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white"
										>
											{customer.id}
										</td>
										<td
											class="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
										>
											{customer.name}
										</td>
										<td
											class="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
										>
											{customer.email}
										</td>
										<td
											class="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
										>
											{customer.totalOrders}
										</td>
										<td
											class="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
										>
											{customer.lastOrder}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>

					<!-- Empty state or load more -->
					<div class="mt-6 text-center">
						<Button color="light" size="sm">View All Customers</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
