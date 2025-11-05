import { renderComponent } from '$lib/components/ui/data-table/render-helpers';
import type { Service } from '$svc/services/services.types';
import type { ColumnDef } from '@tanstack/table-core';
import { formatDistanceToNow } from 'date-fns';
import ServiceActions from './service-actions.svelte';

export const getServiceColumns = (onLoadData: () => void): ColumnDef<Service>[] => [
	{
		accessorKey: 'Name',
		header: 'Service Name'
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
			const service = row.original;
			return renderComponent(ServiceActions, { service, onLoadData });
		}
	}
];
