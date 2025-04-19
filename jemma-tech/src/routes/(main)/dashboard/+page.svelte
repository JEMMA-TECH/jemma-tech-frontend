<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {
      Card,
      CardHeader,
      CardTitle,
      CardContent
    } from "$lib/components/ui/card";

    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { onDestroy } from "svelte";
  
  
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
  
      <!-- Top Bar -->
      <header class="hidden flex bg-white shadow px-6 py-4 justify-between items-center">
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

  