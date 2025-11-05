import { renderComponent } from '$lib/components/ui/data-table/render-helpers';
import type { Item } from '$svc/items/items.types';
import type { ColumnDef } from '@tanstack/table-core';
import { formatDistanceToNow } from 'date-fns';
import ItemActions from './item-actions.svelte';

export const getItemColumns = (onLoadData: () => void): ColumnDef<Item>[] => [
	{
		accessorKey: 'Name',
		header: 'Item Name'
	},
	{
		accessorKey: 'Service.Name',
		header: 'Service',
		cell: ({ row }) => {
			const item = row.original;
			return item.Service?.Name || 'N/A';
		}
	},
	{
		accessorKey: 'CreatedAt',
		header: 'Created',
		cell: ({ row }) => {
			try {
				const date = new Date(row.original.CreatedAt);
				return formatDistanceToNow(date, { addSuffix: true });
			} catch {
				return 'N/A';
			}
		}
	},
	{
		accessorKey: 'UpdatedAt',
		header: 'Last Updated',
		cell: ({ row }) => {
			try {
				const date = new Date(row.original.UpdatedAt);
				return formatDistanceToNow(date, { addSuffix: true });
			} catch {
				return 'N/A';
			}
		}
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const item = row.original;
			return renderComponent(ItemActions, { item, onLoadData });
		}
	}
];
