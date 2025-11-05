<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar";
	import { useSidebar } from "$lib/components/ui/sidebar";
	import { cn } from "$lib/utils";
	import { goto } from '$app/navigation';
	import { pref } from '$lib/common/local-storage';
	import {
		Home,
		Package,
		Users,
		Settings,
		LogOut,
		User,
		ChevronUp,
		CreditCard
	} from "lucide-svelte";
	import { page } from '$app/stores';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		name = "George Amenuvor",
		email = "gamenuvor44@gmail.com",
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & {
		name?: string;
		email?: string;
	} = $props();

	let showDropdown = $state(false);

	const sidebar = useSidebar();
	const companyName = "JEMMA Tech";

	const navigationItems = [
		{ title: "Dashboard", url: "/dashboard", icon: Home },
		{ title: "Orders", url: "/orders", icon: Package },
		{ title: "Customers", url: "/customers", icon: Users },
		{ title: "Employees", url: "/employees", icon: User },
		{ title: "Payments", url: "/payments", icon: CreditCard },
		{ title: "Settings", url: "/settings", icon: Settings }
	];

	function handleLogout() {
		showDropdown = false;
		pref.remove('@jemma/access');
		pref.remove('@jemma/refresh');
		goto('/init');
	}

	function isActive(url: string) {
		if (url === '/settings') {
			return $page.url.pathname.startsWith('/settings');
		}
		return $page.url.pathname === url;
	}

	function toggleDropdown() {
		showDropdown = !showDropdown;
	}
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<button class="flex items-center gap-3 w-full" {...props}>
							<div class="flex items-center justify-center w-8 h-8 bg-teal-600 text-white rounded-lg shrink-0">
								<span class="text-xs font-bold">{companyName.slice(0, 2)}</span>
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">{companyName}</span>
								<span class="truncate text-xs text-muted-foreground">Laundry Management</span>
							</div>
						</button>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each navigationItems as item}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								isActive={isActive(item.url)}
								class="w-full items-center rounded-md !bg-transparent px-3 py-2
									   transition-colors hover:!bg-transparent active:!bg-transparent
									   data-[active=true]:!bg-transparent data-[state=open]:hover:!bg-transparent
									   {isActive(item.url)
									? 'text-teal-700 data-[active=true]:text-teal-700 font-medium bg-teal-50 data-[active=true]:bg-teal-50'
									: 'hover:text-foreground data-[active=true]:text-muted-foreground text-muted-foreground'}"
								onclick={() => {
									if (sidebar.isMobile) {
										sidebar.setOpenMobile(false);
									}
									goto(item.url);
								}}
							>
								{#snippet child({ props })}
									<div class="flex w-full items-center gap-3" {...props}>
										<item.icon class={cn("w-4 h-4", isActive(item.url) ? "text-teal-600" : "")} />
										<span class="text-sm">{item.title}</span>
									</div>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<div class="relative w-full">
					<button
						onclick={toggleDropdown}
						class="flex items-center gap-3 w-full p-2 rounded-md hover:bg-accent transition-colors"
					>
						<img
							src={`https://api.dicebear.com/9.x/notionists/svg?seed=${name}`}
							alt="avatar"
							class="w-8 h-8 rounded shrink-0 bg-primary shadow"
						/>
						<div class="flex-1 min-w-0 text-left">
							<p class="text-sm font-semibold truncate">{name}</p>
							<p class="text-xs text-muted-foreground truncate">{email}</p>
						</div>
						<ChevronUp class="w-4 h-4 transition-transform {showDropdown ? 'rotate-180' : ''}" />
					</button>

					{#if showDropdown}
						<div class="absolute bottom-full left-0 right-0 mb-2 bg-popover border border-border rounded-lg shadow-lg z-50">
							<div class="py-1">
								<button
									onclick={handleLogout}
									class="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
								>
									<LogOut class="w-4 h-4" />
									Log Out
								</button>
							</div>
						</div>
					{/if}
				</div>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
