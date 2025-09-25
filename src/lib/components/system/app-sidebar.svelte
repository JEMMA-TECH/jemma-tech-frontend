<script lang="ts">
	import {
		Home,
		Users,
		Package,
		ShoppingCart,
		CreditCard,
		Settings,
		UserCheck,
		Warehouse,
		Truck,
		BarChart3,
		Shirt
	} from 'lucide-svelte';
	import {
		Sidebar,
		SidebarContent,
		SidebarFooter,
		SidebarHeader,
		SidebarMenu,
		SidebarMenuButton,
		SidebarMenuItem,
		SidebarGroup,
		SidebarGroupContent,
		SidebarGroupLabel
	} from '$lib/components/ui/sidebar';
	import { page } from '$app/stores';

	const mainNavigation = [
		{ title: 'Dashboard', url: '/private', icon: Home },
		{ title: 'Orders', url: '/private/orders', icon: ShoppingCart },
		{ title: 'Inventory', url: '/private/inventory', icon: Warehouse },
		{ title: 'Customers', url: '/private/customers', icon: Users }
	];

	const operationsNavigation = [
		{ title: 'Pickup & Delivery', url: '/private/pickup-delivery', icon: Truck },
		{ title: 'Services', url: '/private/services', icon: Package },
		{ title: 'Items', url: '/private/items', icon: Shirt },
		{ title: 'Payments', url: '/private/payments', icon: CreditCard }
	];

	const managementNavigation = [
		{ title: 'Reports', url: '/private/reports', icon: BarChart3 },
		{ title: 'Employees', url: '/private/employees', icon: UserCheck },
		{ title: 'Settings', url: '/private/settings', icon: Settings }
	];

	$: currentPath = $page.url.pathname;
</script>

<Sidebar>
	<SidebarHeader class="border-b">
		<div class="px-3 py-2">
			<h2 class="text-lg font-semibold">JEMMA Laundry</h2>
		</div>
	</SidebarHeader>

	<SidebarContent>
		<!-- Main Navigation -->
		<SidebarGroup>
			<SidebarGroupLabel>Main</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{#each mainNavigation as item}
						<SidebarMenuItem>
							<SidebarMenuButton href={item.url} isActive={currentPath === item.url}>
								<svelte:component this={item.icon} class="w-4 h-4" />
								<span>{item.title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					{/each}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>

		<!-- Operations Navigation -->
		<SidebarGroup>
			<SidebarGroupLabel>Operations</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{#each operationsNavigation as item}
						<SidebarMenuItem>
							<SidebarMenuButton href={item.url} isActive={currentPath === item.url}>
								<svelte:component this={item.icon} class="w-4 h-4" />
								<span>{item.title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					{/each}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>

		<!-- Management Navigation -->
		<SidebarGroup>
			<SidebarGroupLabel>Management</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{#each managementNavigation as item}
						<SidebarMenuItem>
							<SidebarMenuButton href={item.url} isActive={currentPath === item.url}>
								<svelte:component this={item.icon} class="w-4 h-4" />
								<span>{item.title}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					{/each}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	</SidebarContent>

	<SidebarFooter class="border-t">
		<div class="px-3 py-2">
			<p class="text-xs text-muted-foreground">
				© 2024 JEMMA Laundry Management
			</p>
		</div>
	</SidebarFooter>
</Sidebar>