<script lang="ts">
	import { page } from '$app/state';
	import {
		Sidebar,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import {
		ChartBar,
		ShoppingCart,
		Shirt,
		Users,
		Package,
		Bell,
		FileText,
		Settings,
		HelpCircle,
		Droplet
	} from '@lucide/svelte';

	let spanClass = 'flex-1 ml-3 whitespace-nowrap';
	let activeUrl = $derived(page.url.pathname);
</script>

<Sidebar
	breakpoint="lg"
	backdrop={false}
	params={{ x: -50, duration: 50 }}
	class="top-0 left-0 h-screen w-64 bg-gray-50 dark:bg-gray-800"
	divClass="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800 p-0 border-r border-gray-200 dark:border-gray-700"
	{activeUrl}
	activeClass=""
>
	<SidebarWrapper class="flex h-full flex-col">
		<!-- Header Section -->
		<div class="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800">
			<div class="flex items-center space-x-3">
				<div class="bg-primary-500 flex h-8 w-8 items-center justify-center rounded">
					<Droplet class="h-5 w-5 text-white" />
				</div>
				<div>
					<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Jemma</h2>
				</div>
			</div>
		</div>

		<!-- Main Content - This will take up available space -->
		<div class="flex-1 overflow-y-auto p-4">
			<SidebarGroup>
				<SidebarItem label="Dashboard" href="/">
					{#snippet icon()}
						<ChartBar class="h-5 w-5 text-gray-500 dark:text-gray-400" />
					{/snippet}
				</SidebarItem>

				<SidebarDropdownWrapper label="Orders">
					{#snippet icon()}
						<ShoppingCart class="h-5 w-5 text-gray-500 dark:text-gray-400" />
					{/snippet}
					<SidebarDropdownItem label="New Order" href="/orders/new" />
					<SidebarDropdownItem label="Active Orders" href="/orders/active" />
					<SidebarDropdownItem label="Order History" href="/orders/history" />
					<SidebarDropdownItem label="Bulk Orders" href="/orders/bulk" />
				</SidebarDropdownWrapper>

				<SidebarDropdownWrapper label="Services">
					{#snippet icon()}
						<Shirt class="h-5 w-5 text-gray-500 dark:text-gray-400" />
					{/snippet}
					<SidebarDropdownItem label="Wash & Fold" href="/services/washing" />
					<SidebarDropdownItem label="Dry Cleaning" href="/services/cleaning" />
					<SidebarDropdownItem label="Ironing" href="/services/ironing" />
					<SidebarDropdownItem label="Alterations" href="/services/alterations" />
				</SidebarDropdownWrapper>

				<SidebarItem label="Customers" href="/customers" {spanClass}>
					{#snippet icon()}
						<Users class="h-5 w-5 text-gray-500 dark:text-gray-400" />
					{/snippet}
				</SidebarItem>

				<SidebarDropdownWrapper label="Inventory">
					{#snippet icon()}
						<Package class="h-5 w-5 text-gray-500 dark:text-gray-400" />
					{/snippet}
					<SidebarDropdownItem label="Detergents" href="/inventory/detergents" />
					<SidebarDropdownItem label="Supplies" href="/inventory/supplies" />
					<SidebarDropdownItem label="Equipment" href="/inventory/equipment" />
					<SidebarDropdownItem label="Low Stock Alerts" href="/inventory/low-stock" />
				</SidebarDropdownWrapper>

				<SidebarItem label="Notifications" href="/notifications" {spanClass}>
					{#snippet icon()}
						<Bell class="h-5 w-5 text-gray-500 dark:text-gray-400" />
					{/snippet}
					{#snippet subtext()}
						<span
							class="ml-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200"
							>3</span
						>
					{/snippet}
				</SidebarItem>
			</SidebarGroup>

			<SidebarGroup border class="border-t border-gray-200 dark:border-gray-700">
				<SidebarItem label="Reports" {spanClass}>
					{#snippet icon()}
						<FileText class="h-5 w-5 text-gray-500 dark:text-gray-400" />
					{/snippet}
				</SidebarItem>

				<SidebarItem label="Settings" href="/" active={activeUrl === '/settings'}>
					{#snippet icon()}
						<Settings class="h-5 w-5 text-gray-500 dark:text-gray-400" />
					{/snippet}
				</SidebarItem>

				<SidebarItem label="Help & Support" href="/support">
					{#snippet icon()}
						<HelpCircle class="h-5 w-5 text-gray-500 dark:text-gray-400" />
					{/snippet}
				</SidebarItem>
			</SidebarGroup>
		</div>

		<!-- Footer Section: Now positioned at the bottom -->
		<div class="border-t border-gray-200 p-4 dark:border-gray-700">
			<div class="bg-primary-50 dark:bg-primary-900 rounded p-3">
				<div class="text-primary-900 dark:text-primary-100 text-sm font-medium">Need Help?</div>
				<div class="text-primary-700 dark:text-primary-300 mt-1 text-xs">
					Contact our support team
				</div>
				<button
					class="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 mt-2 rounded px-3 py-1 text-xs font-medium text-white"
				>
					Get Support
				</button>
			</div>
		</div>
	</SidebarWrapper>
</Sidebar>
