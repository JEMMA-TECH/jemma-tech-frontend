<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import {
		Package,
		Users,
		DollarSign,
		TrendingUp,
		TrendingDown,
		Clock,
		CheckCircle2,
		AlertCircle,
		RefreshCw,
		Calendar,
		ArrowUpRight,
		ArrowRight
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { dashboardService } from '$svc/dashboard/dashboard.service';
	import type { DashboardData, DashboardParams } from '$svc/dashboard/dashboard.types';
	import { getOrders } from '$svc/orders/orders.service';
	import { getCustomers } from '$svc/customers/customers.service';
	import { getPayments } from '$svc/payments/payments.service';
	import LineChart from '$lib/components/charts/line-chart.svelte';
	import PieChart from '$lib/components/charts/pie-chart.svelte';
	import BarChart from '$lib/components/charts/bar-chart.svelte';
	import QuickActions from './quick-actions.svelte';
	import { toast } from 'svelte-sonner';
	import { formatDistanceToNow } from 'date-fns';

	let dashboardData = $state<DashboardData | null>(null);
	let isLoading = $state(true);
	let selectedTimeFrame = $state<'daily' | 'weekly' | 'monthly'>('monthly');

	async function fetchDashboard() {
		// Only fetch on client-side to avoid SSR errors
		if (!browser) {
			isLoading = false;
			return;
		}

		try {
			isLoading = true;
			const params: DashboardParams = {
				timeFrame: selectedTimeFrame
			};
			const response = await dashboardService.getDashboard(params);
			if (response.IsSuccess) {
				dashboardData = response.Data;
			} else {
				// Use fallback if API fails
				await fetchFromIndividualEndpoints();
			}
		} catch (error) {
			console.error('Error fetching dashboard:', error);
			// API endpoint might not exist yet, fetch from individual endpoints
			await fetchFromIndividualEndpoints();
		} finally {
			isLoading = false;
		}
	}

	async function fetchFromIndividualEndpoints() {
		try {
			// Fetch from individual endpoints
			const [ordersRes, customersRes, paymentsRes] = await Promise.all([
				getOrders(),
				getCustomers(),
				getPayments()
			]);

			const orders = ordersRes.IsSuccess ? ordersRes.Data : [];
			const customers = customersRes.IsSuccess ? customersRes.Data : [];
			const payments = paymentsRes.IsSuccess ? paymentsRes.Data : [];

			// Calculate stats
			const totalOrders = orders.length;
			const totalCustomers = customers.length;
			const totalRevenue = orders.reduce((sum, order) => sum + (order.TotalAmount || 0), 0);
			const pendingOrders = orders.filter((o) =>
				o.Status?.toLowerCase().includes('pending')
			).length;
			const completedOrders = orders.filter((o) =>
				o.Status?.toLowerCase().includes('complete')
			).length;
			const inProgressOrders = orders.filter((o) =>
				o.Status?.toLowerCase().includes('progress')
			).length;
			const totalPayments = payments.length;
			const pendingPayments = payments.filter((p) => p.PaymentStatus === 0).length;
			const completedPayments = payments.filter((p) => p.PaymentStatus === 1).length;

			// Sort by date for recent items
			const recentOrders = [...orders]
				.sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())
				.slice(0, 5);
			const recentCustomers = [...customers]
				.sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())
				.slice(0, 4);
			const recentPayments = [...payments]
				.sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())
				.slice(0, 4);

			// Group orders by status for pie chart
			const statusCounts = orders.reduce(
				(acc, order) => {
					const status = order.Status || 'Unknown';
					acc[status] = (acc[status] || 0) + 1;
					return acc;
				},
				{} as Record<string, number>
			);

			const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({
				Status: status,
				Count: count
			}));

			dashboardData = {
				Stats: {
					TotalOrders: totalOrders,
					TotalCustomers: totalCustomers,
					TotalRevenue: totalRevenue,
					PendingOrders: pendingOrders,
					CompletedOrders: completedOrders,
					InProgressOrders: inProgressOrders,
					TotalPayments: totalPayments,
					PendingPayments: pendingPayments,
					CompletedPayments: completedPayments,
					RevenueGrowth: 0,
					OrderGrowth: 0,
					CustomerGrowth: 0
				},
				RecentOrders: recentOrders,
				RecentCustomers: recentCustomers,
				RecentPayments: recentPayments,
				RevenueByDay: [],
				OrdersByStatus: ordersByStatus,
				RevenueByMonth: []
			};
		} catch (error) {
			console.error('Error fetching from individual endpoints:', error);
			toast.error('Failed to load dashboard data');
		}
	}

	onMount(() => {
		fetchDashboard();
	});

	function getOrderStatusColor(status: string | undefined) {
		if (!status) return 'bg-gray-50 text-gray-700 border-gray-200';
		const statusLower = status.toLowerCase();
		if (statusLower.includes('pending')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
		if (statusLower.includes('progress') || statusLower.includes('processing'))
			return 'bg-blue-50 text-blue-700 border-blue-200';
		if (statusLower.includes('complete') || statusLower.includes('delivered'))
			return 'bg-green-50 text-green-700 border-green-200';
		if (statusLower.includes('cancel')) return 'bg-red-50 text-red-700 border-red-200';
		return 'bg-gray-50 text-gray-700 border-gray-200';
	}

	function getPaymentStatusColor(status: number | undefined) {
		// Assuming: 0 = Pending, 1 = Completed, 2 = Failed
		if (status === undefined || status === null) return 'bg-gray-50 text-gray-700 border-gray-200';
		if (status === 0) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
		if (status === 1) return 'bg-green-50 text-green-700 border-green-200';
		if (status === 2) return 'bg-red-50 text-red-700 border-red-200';
		return 'bg-gray-50 text-gray-700 border-gray-200';
	}

	function getPaymentStatusText(status: number | undefined) {
		if (status === undefined || status === null) return 'Unknown';
		if (status === 0) return 'Pending';
		if (status === 1) return 'Completed';
		if (status === 2) return 'Failed';
		return 'Unknown';
	}

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(amount);
	}

	// Prepare chart data
	const revenueChartData = $derived(
		dashboardData?.RevenueByDay?.map((d) => ({
			name: new Date(d.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
			value: d.Revenue
		})) || []
	);

	const orderStatusChartData = $derived(
		dashboardData?.OrdersByStatus?.map((d) => ({
			name: d.Status,
			value: d.Count
		})) || []
	);

	const monthlyRevenueChartData = $derived(
		dashboardData?.RevenueByMonth?.map((d) => ({
			name: new Date(d.Date).toLocaleDateString('en-US', { month: 'short' }),
			value: d.Revenue
		})) || []
	);

	const timeFrameLabel = $derived(
		selectedTimeFrame.charAt(0).toUpperCase() + selectedTimeFrame.slice(1)
	);
</script>

<div class="space-y-6 pb-8">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
			<p class="text-muted-foreground mt-1">
				Welcome back! Here's what's happening with your business.
			</p>
		</div>

		<div class="flex items-center gap-3">
			<!-- Time Frame Selector -->
			<Select.Root
				type="single"
				value={selectedTimeFrame}
				onValueChange={(v) => {
					if (v) {
						selectedTimeFrame = v as 'daily' | 'weekly' | 'monthly';
						fetchDashboard();
					}
				}}
			>
				<Select.Trigger class="w-[140px]">
					<Calendar class="h-4 w-4 mr-2" />
					{timeFrameLabel}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="daily" label="Daily">Daily</Select.Item>
					<Select.Item value="weekly" label="Weekly">Weekly</Select.Item>
					<Select.Item value="monthly" label="Monthly">Monthly</Select.Item>
				</Select.Content>
			</Select.Root>

			<!-- Refresh Button -->
			<Button
				variant="outline"
				size="icon"
				onclick={() => fetchDashboard()}
				disabled={isLoading}
			>
				<RefreshCw class="h-4 w-4 {isLoading ? 'animate-spin' : ''}" />
			</Button>
		</div>
	</div>

	<!-- Stats Grid -->
	{#if isLoading}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each Array(8) as _}
				<Card.Root>
					<Card.Header class="pb-2">
						<Skeleton class="h-4 w-24" />
					</Card.Header>
					<Card.Content>
						<Skeleton class="h-8 w-16 mb-2" />
						<Skeleton class="h-3 w-32" />
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	{:else if dashboardData}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<!-- Total Orders -->
			<Card.Root class="hover:shadow-lg transition-shadow border-l-4 border-l-teal-500">
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Total Orders</Card.Title>
					<div class="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-950 flex items-center justify-center">
						<Package class="h-6 w-6 text-teal-600 dark:text-teal-400" />
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{dashboardData.Stats.TotalOrders}</div>
					<div class="flex items-center gap-1 mt-1">
						{#if dashboardData.Stats.OrderGrowth >= 0}
							<TrendingUp class="h-3 w-3 text-green-600" />
							<p class="text-xs text-green-600 font-medium">
								+{dashboardData.Stats.OrderGrowth.toFixed(1)}%
							</p>
						{:else}
							<TrendingDown class="h-3 w-3 text-red-600" />
							<p class="text-xs text-red-600 font-medium">
								{dashboardData.Stats.OrderGrowth.toFixed(1)}%
							</p>
						{/if}
						<p class="text-xs text-muted-foreground">from last period</p>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Total Customers -->
			<Card.Root class="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Total Customers</Card.Title>
					<div class="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
						<Users class="h-6 w-6 text-blue-600 dark:text-blue-400" />
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{dashboardData.Stats.TotalCustomers}</div>
					<div class="flex items-center gap-1 mt-1">
						{#if dashboardData.Stats.CustomerGrowth >= 0}
							<TrendingUp class="h-3 w-3 text-green-600" />
							<p class="text-xs text-green-600 font-medium">
								+{dashboardData.Stats.CustomerGrowth.toFixed(1)}%
							</p>
						{:else}
							<TrendingDown class="h-3 w-3 text-red-600" />
							<p class="text-xs text-red-600 font-medium">
								{dashboardData.Stats.CustomerGrowth.toFixed(1)}%
							</p>
						{/if}
						<p class="text-xs text-muted-foreground">from last period</p>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Total Revenue -->
			<Card.Root class="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
					<div class="h-12 w-12 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
						<DollarSign class="h-6 w-6 text-green-600 dark:text-green-400" />
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{formatCurrency(dashboardData.Stats.TotalRevenue)}</div>
					<div class="flex items-center gap-1 mt-1">
						{#if dashboardData.Stats.RevenueGrowth >= 0}
							<TrendingUp class="h-3 w-3 text-green-600" />
							<p class="text-xs text-green-600 font-medium">
								+{dashboardData.Stats.RevenueGrowth.toFixed(1)}%
							</p>
						{:else}
							<TrendingDown class="h-3 w-3 text-red-600" />
							<p class="text-xs text-red-600 font-medium">
								{dashboardData.Stats.RevenueGrowth.toFixed(1)}%
							</p>
						{/if}
						<p class="text-xs text-muted-foreground">from last period</p>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Total Payments -->
			<Card.Root class="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Total Payments</Card.Title>
					<div class="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
						<DollarSign class="h-6 w-6 text-purple-600 dark:text-purple-400" />
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{dashboardData.Stats.TotalPayments}</div>
					<p class="text-xs text-muted-foreground mt-1">
						{dashboardData.Stats.CompletedPayments} completed
					</p>
				</Card.Content>
			</Card.Root>

			<!-- Pending Orders -->
			<Card.Root class="hover:shadow-lg transition-shadow">
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Pending Orders</Card.Title>
					<Clock class="h-5 w-5 text-yellow-600" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold text-yellow-600">
						{dashboardData.Stats.PendingOrders}
					</div>
					<p class="text-xs text-muted-foreground mt-1">Awaiting processing</p>
				</Card.Content>
			</Card.Root>

			<!-- In Progress Orders -->
			<Card.Root class="hover:shadow-lg transition-shadow">
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">In Progress</Card.Title>
					<AlertCircle class="h-5 w-5 text-blue-600" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold text-blue-600">
						{dashboardData.Stats.InProgressOrders}
					</div>
					<p class="text-xs text-muted-foreground mt-1">Currently processing</p>
				</Card.Content>
			</Card.Root>

			<!-- Completed Orders -->
			<Card.Root class="hover:shadow-lg transition-shadow">
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Completed Orders</Card.Title>
					<CheckCircle2 class="h-5 w-5 text-green-600" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold text-green-600">
						{dashboardData.Stats.CompletedOrders}
					</div>
					<p class="text-xs text-muted-foreground mt-1">Successfully delivered</p>
				</Card.Content>
			</Card.Root>

			<!-- Pending Payments -->
			<Card.Root class="hover:shadow-lg transition-shadow">
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Pending Payments</Card.Title>
					<Clock class="h-5 w-5 text-orange-600" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold text-orange-600">
						{dashboardData.Stats.PendingPayments}
					</div>
					<p class="text-xs text-muted-foreground mt-1">Awaiting payment</p>
				</Card.Content>
			</Card.Root>
		</div>
	{/if}

	<!-- Quick Actions -->
	<QuickActions />

	<!-- Charts Row -->
	{#if !isLoading && dashboardData}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Revenue Trend Chart -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Revenue Trend</Card.Title>
					<Card.Description>Daily revenue over time</Card.Description>
				</Card.Header>
				<Card.Content>
					{#if revenueChartData.length > 0}
						<LineChart data={revenueChartData} height="320px" color="#0d9488" />
					{:else}
						<div class="h-[320px] flex items-center justify-center text-muted-foreground">
							No revenue data available
						</div>
					{/if}
				</Card.Content>
			</Card.Root>

			<!-- Orders by Status Chart -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Orders by Status</Card.Title>
					<Card.Description>Distribution of order statuses</Card.Description>
				</Card.Header>
				<Card.Content>
					{#if orderStatusChartData.length > 0}
						<PieChart
							data={orderStatusChartData}
							height="320px"
							colors={['#eab308', '#3b82f6', '#22c55e', '#ef4444']}
						/>
					{:else}
						<div class="h-[320px] flex items-center justify-center text-muted-foreground">
							No order status data available
						</div>
					{/if}
				</Card.Content>
			</Card.Root>

			<!-- Monthly Revenue Chart -->
			{#if monthlyRevenueChartData.length > 0}
				<Card.Root class="lg:col-span-2">
					<Card.Header>
						<Card.Title>Monthly Revenue</Card.Title>
						<Card.Description>Revenue breakdown by month</Card.Description>
					</Card.Header>
					<Card.Content>
						<BarChart data={monthlyRevenueChartData} height="320px" color="#0d9488" />
					</Card.Content>
				</Card.Root>
			{/if}
		</div>
	{/if}

	<!-- Recent Orders -->
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between">
			<div>
				<Card.Title>Recent Orders</Card.Title>
				<Card.Description>Latest orders from your customers</Card.Description>
			</div>
			<Button variant="ghost" size="sm" onclick={() => (window.location.href = '/orders')}>
				View all
				<ArrowRight class="h-4 w-4 ml-2" />
			</Button>
		</Card.Header>
		<Card.Content>
			{#if isLoading}
				<div class="space-y-3">
					{#each Array(5) as _}
						<Skeleton class="h-16 w-full" />
					{/each}
				</div>
			{:else if dashboardData && dashboardData.RecentOrders.length > 0}
				<div class="space-y-3">
					{#each dashboardData.RecentOrders.slice(0, 5) as order}
						<button
							onclick={() => (window.location.href = '/orders')}
							class="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors text-left group"
						>
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-2 mb-1">
									<p class="font-medium text-sm truncate">
										{order.Customer?.FirstName || 'Unknown'}
										{order.Customer?.LastName || ''}
									</p>
									<Badge variant="outline" class={getOrderStatusColor(order.Status)}>
										{order.Status || 'Unknown'}
									</Badge>
								</div>
								<p class="text-xs text-muted-foreground truncate">
									{order.Customer?.Email || 'No email'}
								</p>
								<p class="text-xs text-muted-foreground mt-0.5">
									{formatDistanceToNow(new Date(order.CreatedAt), { addSuffix: true })}
								</p>
							</div>
							<div class="flex items-center gap-3 ml-4">
								<div class="text-right">
									<p class="font-semibold text-sm">{formatCurrency(order.TotalAmount || 0)}</p>
									<p class="text-xs text-muted-foreground">
										{order.OrderItems?.length || 0} items
									</p>
								</div>
								<ArrowUpRight class="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
							</div>
						</button>
					{/each}
				</div>
			{:else}
				<div class="text-center py-8 text-muted-foreground">
					<Package class="h-12 w-12 mx-auto mb-3 opacity-50" />
					<p class="text-sm">No recent orders</p>
				</div>
			{/if}
		</Card.Content>
	</Card.Root>

	<!-- Recent Customers and Payments -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Recent Customers -->
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between">
				<div>
					<Card.Title>Recent Customers</Card.Title>
					<Card.Description>Newly registered customers</Card.Description>
				</div>
				<Button variant="ghost" size="sm" onclick={() => (window.location.href = '/customers')}>
					View all
					<ArrowRight class="h-4 w-4 ml-2" />
				</Button>
			</Card.Header>
			<Card.Content>
				{#if isLoading}
					<div class="space-y-3">
						{#each Array(4) as _}
							<Skeleton class="h-14 w-full" />
						{/each}
					</div>
				{:else if dashboardData && dashboardData.RecentCustomers.length > 0}
					<div class="space-y-3">
						{#each dashboardData.RecentCustomers.slice(0, 4) as customer}
							<div class="flex items-center gap-3 p-3 rounded-lg border">
								<div class="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold">
									{customer.FirstName?.[0] || 'U'}{customer.LastName?.[0] || 'U'}
								</div>
								<div class="flex-1 min-w-0">
									<p class="font-medium text-sm truncate">
										{customer.FirstName || 'Unknown'}
										{customer.LastName || ''}
									</p>
									<p class="text-xs text-muted-foreground truncate">{customer.Email || 'No email'}</p>
								</div>
								<p class="text-xs text-muted-foreground whitespace-nowrap">
									{formatDistanceToNow(new Date(customer.CreatedAt), { addSuffix: true })}
								</p>
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-8 text-muted-foreground">
						<Users class="h-12 w-12 mx-auto mb-3 opacity-50" />
						<p class="text-sm">No recent customers</p>
					</div>
				{/if}
			</Card.Content>
		</Card.Root>

		<!-- Recent Payments -->
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between">
				<div>
					<Card.Title>Recent Payments</Card.Title>
					<Card.Description>Latest payment transactions</Card.Description>
				</div>
				<Button variant="ghost" size="sm" onclick={() => (window.location.href = '/payments')}>
					View all
					<ArrowRight class="h-4 w-4 ml-2" />
				</Button>
			</Card.Header>
			<Card.Content>
				{#if isLoading}
					<div class="space-y-3">
						{#each Array(4) as _}
							<Skeleton class="h-14 w-full" />
						{/each}
					</div>
				{:else if dashboardData && dashboardData.RecentPayments.length > 0}
					<div class="space-y-3">
						{#each dashboardData.RecentPayments.slice(0, 4) as payment}
							<div class="flex items-center justify-between p-3 rounded-lg border">
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-2 mb-1">
										<p class="font-medium text-sm truncate">
											{payment.Customer?.FirstName || 'Unknown'}
											{payment.Customer?.LastName || ''}
										</p>
										<Badge
											variant="outline"
											class={getPaymentStatusColor(payment.PaymentStatus)}
										>
											{getPaymentStatusText(payment.PaymentStatus)}
										</Badge>
									</div>
									<p class="text-xs text-muted-foreground">
										{formatDistanceToNow(new Date(payment.CreatedAt), { addSuffix: true })}
									</p>
								</div>
								<p class="font-semibold ml-4">{formatCurrency(payment.Amount || 0)}</p>
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-8 text-muted-foreground">
						<DollarSign class="h-12 w-12 mx-auto mb-3 opacity-50" />
						<p class="text-sm">No recent payments</p>
					</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</div>
