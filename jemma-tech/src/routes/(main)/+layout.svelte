<script>
let { children } = $props();

</script>

<aside class={" w-64 h-screen bg-[#001f3f] text-white flex flex-col"}>
    <div class="p-6 text-xl font-bold tracking-wide">Jemma</div>
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
      <span class="font-semibold">Bernd</span>
    </div>
  </aside>

{@render children()}

