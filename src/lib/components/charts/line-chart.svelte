<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as echarts from 'echarts';
	import type { EChartsOption } from 'echarts';

	interface Props {
		data: { name: string; value: number }[];
		title?: string;
		color?: string;
		height?: string;
		smooth?: boolean;
		areaStyle?: boolean;
	}

	let {
		data = [],
		title = '',
		color = '#0d9488',
		height = '300px',
		smooth = true,
		areaStyle = true
	}: Props = $props();

	let chartContainer: HTMLDivElement;
	let chart: echarts.ECharts | null = null;

	onMount(() => {
		chart = echarts.init(chartContainer);
		updateChart();

		// Handle window resize
		const resizeObserver = new ResizeObserver(() => {
			chart?.resize();
		});
		resizeObserver.observe(chartContainer);

		return () => {
			resizeObserver.disconnect();
		};
	});

	$effect(() => {
		// React to data changes
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
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: title ? '15%' : '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				data: data.map((d) => d.name),
				boundaryGap: false,
				axisLine: {
					lineStyle: {
						color: '#e5e7eb'
					}
				},
				axisLabel: {
					color: '#6b7280'
				}
			},
			yAxis: {
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
					type: 'line',
					smooth: smooth,
					itemStyle: {
						color: color
					},
					lineStyle: {
						width: 3,
						color: color
					},
					areaStyle: areaStyle
						? {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: color + '40'
									},
									{
										offset: 1,
										color: color + '00'
									}
								])
							}
						: undefined
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
