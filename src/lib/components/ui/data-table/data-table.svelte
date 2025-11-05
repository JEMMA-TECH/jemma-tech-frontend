<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		getCoreRowModel,
		getPaginationRowModel,
		getFilteredRowModel,
		getSortedRowModel,
		type PaginationState,
		type ColumnFiltersState,
		type SortingState,
		type VisibilityState
	} from '@tanstack/table-core';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { createSvelteTable } from './data-table.svelte.js';
	import FlexRender from './flex-render.svelte';
	import { Search, Filter, ChevronDown, X, RefreshCw } from 'lucide-svelte';

	type FilterConfig = {
		columnId: string;
		label?: string;
		placeholder?: string;
		valueFormatter?: (value: any) => string;
		valueExtractor?: (row: any) => any;
		sortValues?: boolean;
	};

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		searchKey?: string;
		searchPlaceholder?: string;
		enableColumnFilters?: boolean;
		enableSorting?: boolean;
		pageSize?: number;
		filterConfigs?: FilterConfig[];
		onRefresh?: () => void | Promise<void>;
		refreshing?: boolean;
	};

	let {
		data,
		columns,
		searchKey = '',
		searchPlaceholder = 'Search...',
		enableColumnFilters = true,
		enableSorting = true,
		pageSize = 10,
		filterConfigs = [],
		onRefresh,
		refreshing = false
	}: DataTableProps<TData, TValue> = $props();

	// Table state - use simple state management
	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let columnVisibility = $state<VisibilityState>({});
	let globalFilter = $state('');

	// Local state for UI controls
	let selectedPageSize = $state(String(pageSize));
	let columnFilterValues = $state<Record<string, string>>({});
	let showFilters = $state(false);

	// Page size options
	const pageSizeOptions = [
		{ value: '5', label: '5' },
		{ value: '10', label: '10' },
		{ value: '20', label: '20' },
		{ value: '50', label: '50' },
		{ value: '100', label: '100' }
	];

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnFilters() {
				return columnFilters;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get globalFilter() {
				return globalFilter;
			}
		},
		enableRowSelection: true,
		onPaginationChange: (updater) => {
			pagination = typeof updater === 'function' ? updater(pagination) : updater;
		},
		onSortingChange: (updater) => {
			sorting = typeof updater === 'function' ? updater(sorting) : updater;
		},
		onColumnFiltersChange: (updater) => {
			columnFilters = typeof updater === 'function' ? updater(columnFilters) : updater;
		},
		onColumnVisibilityChange: (updater) => {
			columnVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater;
		},
		onGlobalFilterChange: (updater) => {
			globalFilter = typeof updater === 'function' ? updater(globalFilter) : updater;
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: 'includesString'
	});

	// Helper function to get unique values for column filters
	function getUniqueColumnValues(config: FilterConfig) {
		const uniqueValues = new Set();
		data.forEach((row: any) => {
			let value;
			if (config.valueExtractor) {
				value = config.valueExtractor(row);
			} else {
				value = row[config.columnId];
			}

			if (value !== null && value !== undefined) {
				uniqueValues.add(value);
			}
		});

		let valuesArray = Array.from(uniqueValues);

		// Sort values if specified
		if (config.sortValues !== false) {
			valuesArray.sort((a, b) => {
				// Handle different types of sorting
				if (typeof a === 'string' && typeof b === 'string') {
					return a.localeCompare(b);
				}
				if (typeof a === 'number' && typeof b === 'number') {
					return a - b;
				}
				if (a instanceof Date && b instanceof Date) {
					return a.getTime() - b.getTime();
				}
				return String(a).localeCompare(String(b));
			});
		}

		return valuesArray;
	}

	// Helper function to format filter option display
	function formatFilterValue(value: any, config: FilterConfig): string {
		if (config.valueFormatter) {
			return config.valueFormatter(value);
		}
		return String(value);
	}

	// Get filter configs to render
	function getFilterConfigsToRender(): FilterConfig[] {
		if (filterConfigs.length > 0) {
			return filterConfigs;
		}

		// Auto-generate filter configs for filterable columns if none provided
		if (enableColumnFilters) {
			return table
				.getAllColumns()
				.filter((column) => column.getCanFilter())
				.map((column) => ({
					columnId: column.id,
					label: column.id,
					placeholder: `Filter ${column.id}`
				}));
		}

		return [];
	}

	// Reset all filters
	function resetFilters() {
		globalFilter = '';
		table.resetColumnFilters();
		table.resetSorting();
		columnFilterValues = {};
		showFilters = false;
		pagination = { pageIndex: 0, pageSize: pagination.pageSize };
	}

	// Handle page size change
	function handlePageSizeChange(newSize: string) {
		selectedPageSize = newSize;
		table.setPageSize(Number(newSize));
	}

	// Handle column filter change
	function handleColumnFilterChange(columnId: string, value: string) {
		columnFilterValues[columnId] = value;
		const column = table.getColumn(columnId);
		if (column) {
			column.setFilterValue(value || undefined);
		}
	}

	// Computed values
	const hasActiveFilters = $derived(
		globalFilter !== '' || columnFilters.length > 0 || sorting.length > 0
	);
	const hasActiveColumnFilters = $derived(columnFilters.length > 0);
	const availableFilters = $derived(getFilterConfigsToRender());
	const pageSizeTriggerContent = $derived(
		pageSizeOptions.find((option) => option.value === selectedPageSize)?.label ?? selectedPageSize
	);
</script>

<div class="space-y-4">
	<!-- Search and Filter Controls -->
	<div class="space-y-4">
		<!-- Top Row: Search and Action Buttons -->
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<!-- Left side: Global Search -->
			{#if searchKey}
				<div class="relative w-full max-w-lg">
					<Search class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
					<Input bind:value={globalFilter} placeholder={searchPlaceholder} class="pl-10" />
				</div>
			{:else}
				<div></div>
			{/if}

			<!-- Right side: Action Buttons -->
			<div class="flex items-center gap-2">
				<!-- Refresh Button -->
				{#if onRefresh}
					<Button
						variant="outline"
						size="sm"
						onclick={onRefresh}
						disabled={refreshing}
						class="gap-2"
					>
						<RefreshCw class="h-4 w-4 {refreshing ? 'animate-spin' : ''}" />
						<span class="hidden sm:inline">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
					</Button>
				{/if}

				<!-- Filters Toggle Button -->
				{#if enableColumnFilters && availableFilters.length > 0}
					<Button
						variant="outline"
						size="sm"
						onclick={() => (showFilters = !showFilters)}
						class="gap-2"
					>
						<Filter class="h-4 w-4" />
						<span class="hidden sm:inline">Filters</span>
						{#if hasActiveColumnFilters}
							<div
								class="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/100 text-xs text-white"
							>
								{columnFilters.length}
							</div>
						{/if}
					</Button>
				{/if}

				<!-- Reset Filters -->
				{#if hasActiveFilters}
					<Button variant="outline" size="sm" onclick={resetFilters} class="gap-2">
						<X class="h-4 w-4" />
						<span class="hidden sm:inline">Reset</span>
					</Button>
				{/if}
			</div>
		</div>

		<!-- Collapsible Filters Section -->
		{#if enableColumnFilters && showFilters && availableFilters.length > 0}
			<div class="rounded-lg border bg-gray-50/50 p-4 transition-all">
				<div class="mb-3 flex items-center justify-between">
					<h4 class="text-sm font-medium text-gray-700">Filter Options</h4>
					<Button
						variant="ghost"
						size="sm"
						onclick={() => (showFilters = false)}
						class="h-6 w-6 p-0"
					>
						<X class="h-4 w-4" />
					</Button>
				</div>

				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{#each availableFilters as config}
						{@const uniqueValues = getUniqueColumnValues(config)}
						{@const currentFilterValue = columnFilterValues[config.columnId] || ''}
						{@const triggerContent = currentFilterValue
							? formatFilterValue(currentFilterValue, config)
							: config.placeholder || `All ${config.label || config.columnId}`}

						{#if uniqueValues.length > 0 && uniqueValues.length < 100}
							<div class="space-y-2">
								<span class="text-xs font-medium text-gray-600">
									{config.label || config.columnId}
								</span>
								<Select.Root
									type="single"
									value={currentFilterValue}
									onValueChange={(value) => handleColumnFilterChange(config.columnId, value || '')}
								>
									<Select.Trigger class="h-9 w-full">
										{triggerContent}
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Item value="" label="All">
												All {config.label || config.columnId}
											</Select.Item>
											{#each uniqueValues as value}
												{@const displayValue = formatFilterValue(value, config)}
												<Select.Item value={String(value)} label={displayValue}>
													{displayValue}
												</Select.Item>
											{/each}
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</div>
						{/if}
					{/each}
				</div>

				<!-- Filter Actions -->
				{#if hasActiveColumnFilters}
					<div class="mt-4 flex items-center justify-between border-t pt-3">
						<div class="text-xs text-gray-600">
							{columnFilters.length} filter{columnFilters.length !== 1 ? 's' : ''} applied
						</div>
						<Button
							variant="ghost"
							size="sm"
							onclick={() => {
								table.resetColumnFilters();
								columnFilterValues = {};
							}}
							class="gap-1 text-xs"
						>
							<X class="h-3 w-3" />
							Clear Filters
						</Button>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Data Table -->
	<div class="rounded-md border overflow-x-auto">
		<Table.Root>
			<Table.Header class="bg-gray-100">
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row class="hover:bg-gray-50">
						{#each headerGroup.headers as header (header.id)}
							<Table.Head class="bg-gray-100 font-bold text-xs tracking-wide uppercase">
								{#if !header.isPlaceholder}
									<div class="flex items-center gap-2">
										<FlexRender
											content={header.column.columnDef.header}
											context={header.getContext()}
										/>
										{#if enableSorting && header.column.getCanSort()}
											<Button
												variant="ghost"
												size="sm"
												onclick={() => header.column.toggleSorting()}
												class="h-6 w-6 p-0 hover:bg-gray-200"
											>
												<ChevronDown
													class="h-4 w-4 transition-transform {header.column.getIsSorted() ===
													'desc'
														? 'rotate-180'
														: header.column.getIsSorted() === 'asc'
															? 'rotate-0'
															: 'opacity-50'}"
												/>
											</Button>
										{/if}
									</div>
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body class="bg-white">
				{#each table.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() && 'selected'} class="hover:bg-gray-50">
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell class="bg-white">
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{:else}
					<Table.Row class="hover:bg-gray-50">
						<Table.Cell colspan={columns.length} class="h-24 text-center bg-white">
							{hasActiveFilters ? 'No results match your filters.' : 'No results.'}
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

	<!-- Pagination and Info -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<!-- Results Info -->
		<div class="text-muted-foreground text-sm">
			{#if table.getFilteredRowModel().rows.length > 0}
				Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to
				{Math.min(
					(table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
					table.getFilteredRowModel().rows.length
				)} of {table.getFilteredRowModel().rows.length} results
				{#if table.getFilteredRowModel().rows.length !== data.length}
					(filtered from {data.length} total)
				{/if}
			{:else}
				No results to show
			{/if}
		</div>

		<!-- Pagination Controls -->
		<div class="flex items-center gap-2">
			<!-- Page Size Selector -->
			<div class="flex items-center gap-2">
				<p class="text-sm font-medium">Rows per page</p>
				<Select.Root type="single" value={selectedPageSize} onValueChange={handlePageSizeChange}>
					<Select.Trigger class="h-8 w-[70px]">
						{pageSizeTriggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each pageSizeOptions as option}
								<Select.Item value={option.value} label={option.label}>
									{option.label}
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>

			<!-- Page Navigation -->
			<div class="flex items-center gap-1">
				<Button
					variant="outline"
					size="sm"
					onclick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					First
				</Button>
				<Button
					variant="outline"
					size="sm"
					onclick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>

				<div class="flex items-center gap-1 px-2">
					<span class="text-sm">
						Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</span>
				</div>

				<Button
					variant="outline"
					size="sm"
					onclick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
				<Button
					variant="outline"
					size="sm"
					onclick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					Last
				</Button>
			</div>
		</div>
	</div>
</div>
