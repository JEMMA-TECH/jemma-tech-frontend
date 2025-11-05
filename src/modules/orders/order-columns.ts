import type { ColumnDef } from '@tanstack/table-core';
import type { Order } from '$svc/orders/orders.types';
import { renderComponent } from '$lib/components/ui/data-table/render-helpers';
import { formatDistanceToNow } from 'date-fns';
import OrderActions from './order-actions.svelte';

export const getOrderColumns = (onLoadData: () => void): ColumnDef<Order>[] => [
	{
		accessorKey: 'Id',
		header: 'Order ID',
		cell: ({ row }) => {
			const id = row.original.Id;
			return `#${id.substring(0, 8)}`;
		}
	},
	{
		accessorKey: 'Customer',
		header: 'Customer',
		cell: ({ row }) => {
			const customer = row.original.Customer;
			return `${customer?.FirstName || ''} ${customer?.LastName || ''}`.trim() || 'N/A';
		}
	},
	{
		accessorKey: 'OrderItems',
		header: 'Items',
		cell: ({ row }) => {
			const items = row.original.OrderItems || [];
			return items.length.toString();
		}
	},
	{
		accessorKey: 'TotalAmount',
		header: 'Total Amount',
		cell: ({ row }) => {
			const amount = row.original.TotalAmount || 0;
			return `GH₵ ${amount.toFixed(2)}`;
		}
	},
	{
		accessorKey: 'Status',
		header: 'Status',
		cell: ({ row }) => {
			return row.original.Status || 'Pending';
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
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const order = row.original;
			return renderComponent(OrderActions, { order, onLoadData });
		}
	}
];
