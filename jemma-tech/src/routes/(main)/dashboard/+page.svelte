<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {
      Card,
      CardHeader,
      CardTitle,
      CardContent
    } from "$lib/components/ui/card";
    import { Menu } from "lucide-svelte";
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { onDestroy } from "svelte";
  
    let user = {
      name: "Maame Taylor",
      role: "Manager"
    };
  
    let mobileNavOpen = false;
    const toggleMobileNav = () => (mobileNavOpen = !mobileNavOpen);
  
    let chartCanvas: HTMLCanvasElement;
    let chartInstance: Chart;
  
    onMount(() => {
      chartInstance = new Chart(chartCanvas, {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Orders",
              data: [12, 19, 3, 5, 2, 3, 9],
              backgroundColor: "#001f3f"
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  
    onDestroy(() => {
      chartInstance?.destroy();
    });
  </script>
  
  <style>
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        z-index: 50;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
      }
      .sidebar.open {
        transform: translateX(0);
      }
    }
  </style>
  
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-50">
    <!-- Mobile Topbar -->
    <div class="md:hidden flex items-center justify-between bg-[#001f3f] text-white px-4 py-3">
      <span class="font-bold text-lg">LaundryPro</span>
      <button on:click={toggleMobileNav}><Menu class="w-6 h-6" /></button>
    </div>
  
    <!-- Sidebar -->
    <aside class={`sidebar md:relative md:translate-x-0 w-64 bg-[#001f3f] text-white flex flex-col ${mobileNavOpen ? 'open' : ''}`}>
      <div class="p-6 text-xl font-bold tracking-wide">🧺 LaundryPro</div>
      <nav class="flex-1 px-4 space-y-1 text-sm">
        <a class="block rounded px-3 py-2 hover:bg-[#003366]" href="/dashboard">Dashboard</a>
        <a class="block rounded px-3 py-2 hover:bg-[#003366]" href="/orders">Orders</a>
        <a class="block rounded px-3 py-2 hover:bg-[#003366]" href="/customers">Customers</a>
        <a class="block rounded px-3 py-2 hover:bg-[#003366]" href="/employees">Employees</a>
        <a class="block rounded px-3 py-2 hover:bg-[#003366]" href="/items">Items</a>
        <a class="block rounded px-3 py-2 hover:bg-[#003366]" href="/services">Services</a>
        <a class="block rounded px-3 py-2 hover:bg-[#003366]" href="/payments">Payments</a>
      </nav>
      <div class="p-4 text-xs border-t border-white/20">
        Logged in as <br />
        <span class="font-semibold">{user.name}</span>
      </div>
    </aside>
  
    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Bar -->
      <header class="hidden md:flex bg-white shadow px-6 py-4 justify-between items-center">
        <h1 class="text-xl font-semibold text-[#001f3f]">Dashboard</h1>
        <Button class="bg-[#001f3f] hover:bg-[#001737] text-white">+ New Order</Button>
      </header>
  
      <!-- Dashboard Cards -->
      <main class="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle class="text-sm text-[#003366]">Today's Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-3xl font-bold text-[#001f3f]">18</p>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle class="text-sm text-[#003366]">Active Machines</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-3xl font-bold text-[#001f3f]">7 / 10</p>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle class="text-sm text-[#003366]">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-3xl font-bold text-[#001f3f]">GHS 2,450</p>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle class="text-sm text-[#003366]">Pending Pickups</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-3xl font-bold text-[#001f3f]">5</p>
          </CardContent>
        </Card>
      </main>
  
      <!-- Chart Section -->
      <section class="p-6">
        <Card>
          <CardHeader>
            <CardTitle class="text-sm text-[#003366]">Weekly Order Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <canvas bind:this={chartCanvas} class="w-full h-64"></canvas>
          </CardContent>
        </Card>
      </section>
    </div>
  </div>
  