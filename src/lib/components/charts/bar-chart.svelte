<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as echarts from 'echarts';
	import type { EChartsOption } from 'echarts';

	interface Props {
		data: { name: string; value: number }[];
		title?: string;
		color?: string;
		height?: string;
		horizontal?: boolean;
	}

	let {
		data = [],
		title = '',
		color = '#0d9488',
		height = '300px',
		horizontal = false
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
						textStyle: {
							fontSize: 14,
							fontWeight: 'normal'
						}
					}
				: undefined,
			tooltip: {
				trigger: 'axis',
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				borderColor: 'transparent',
				textStyle: {
					color: '#fff'
				},
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: title ? '15%' : '3%',
				containLabel: true
			},
			xAxis: horizontal
				? {
						type: 'value',
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						splitLine: {
							lineStyle: {
								color: '#f3f4f6'
							}
						},
						axisLabel: {
							color: '#6b7280'
						}
					}
				: {
						type: 'category',
						data: data.map((d) => d.name),
						axisLine: {
							lineStyle: {
								color: '#e5e7eb'
							}
						},
						axisLabel: {
							color: '#6b7280'
						}
					},
			yAxis: horizontal
				? {
						type: 'category',
						data: data.map((d) => d.name),
						axisLine: {
							lineStyle: {
								color: '#e5e7eb'
							}
						},
						axisLabel: {
							color: '#6b7280'
						}
					}
				: {
						type: 'value',
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						splitLine: {
							lineStyle: {
								color: '#f3f4f6'
							}
						},
						axisLabel: {
							color: '#6b7280'
						}
					},
			series: [
				{
					data: data.map((d) => d.value),
					type: 'bar',
					itemStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: color
							},
							{
								offset: 1,
								color: color + 'CC'
							}
						]),
						borderRadius: horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]
					},
					barWidth: '60%'
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
