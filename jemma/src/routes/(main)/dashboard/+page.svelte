<script>
    import SummaryCard from './_components/summary_cards.svelte';

    const cards = [
        { title: 'Revenue', value: '$12,345', icon: '💰' },
        { title: 'Employees', value: '1,234', icon: '👤' },
        { title: 'Customers', value: '567', icon: '👤' },
        { title: 'Orders', value: '543', icon: '👤' },
        { title: 'Pickups', value: '5', icon: '' }
    ];
</script>

<div class="p-8 w-full">
    <div class="grid lg:grid-cols-5 gap-5 w-full">
        {#each cards as card}
            <SummaryCard title={card.title} value={card.value} icon={card.icon} />
        {/each}
    </div>
</div>