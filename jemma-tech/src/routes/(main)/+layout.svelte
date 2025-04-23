<script>
    import { page } from '$app/state';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    import { ChartPie, LayoutGrid, Mailbox, User, LogOut} from 'lucide-svelte';
    $: activeUrl = page.url.pathname;
  </script>
  
  <Sidebar {activeUrl}>
    <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem label="Dashboard" href="/">
          <svelte:fragment slot="icon">
            <ChartPie class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Accordion" href="/docs/components/accordion">
          <svelte:fragment slot="icon">
            <LayoutGrid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Alert" href="/docs/components/alert">
          <svelte:fragment slot="icon">
            <Mailbox class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Sidebar" href="/docs/components/sidebar">
          <svelte:fragment slot="icon">
            <User class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Badge" href="/docs/components/badge">
          <svelte:fragment slot="icon">
            <LogOut class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
