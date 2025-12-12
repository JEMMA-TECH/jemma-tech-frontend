<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as echarts from 'echarts';
	import type { EChartsOption } from 'echarts';

	interface Props {
		data: { name: string; value: number }[];
		title?: string;
		colors?: string[];
		height?: string;
		radius?: string | string[];
	}

	let {
		data = [],
		title = '',
		colors = ['#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4'],
		height = '300px',
		radius = '70%'
	}: Props = $props();

	let chartContainer: HTMLDivElement;
	let chart: echarts.ECharts | null = null;

	onMount(() => {
		chart = echarts.init(chartContainer);
		updateChart();

		const resizeObserver = new ResizeObserver(() => {
			chart?.resize();
		});
		resizeObserver.observe(chartContainer);

		return () => {
			resizeObserver.disconnect();
		};
	});

	$effect(() => {
		if (chart && data) {
			updateChart();
		}
	});

	function updateChart() {
		if (!chart) return;

		const option: EChartsOption = {
			title: title
				? {
						text: title,
						left: 'center',
						textStyle: {
							fontSize: 14,
							fontWeight: 'normal'
						}
					}
				: undefined,
			tooltip: {
				trigger: 'item',
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				borderColor: 'transparent',
				textStyle: {
					color: '#fff'
				},
				formatter: '{b}: {c} ({d}%)'
			},
			legend: {
				bottom: '0%',
				left: 'center',
				textStyle: {
					color: '#6b7280'
				}
			},
			color: colors,
			series: [
				{
					type: 'pie',
					radius: radius,
					center: ['50%', '45%'],
					data: data.map((d) => ({ name: d.name, value: d.value })),
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					label: {
						show: false
					}
				}
			]
		};

		chart.setOption(option);
	}

	onDestroy(() => {
		chart?.dispose();
	});
</script>

<div bind:this={chartContainer} style="width: 100%; height: {height};"></div>
