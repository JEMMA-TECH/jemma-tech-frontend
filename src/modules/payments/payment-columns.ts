import type { ColumnDef } from '@tanstack/table-core';
import type { Payment } from '$svc/payments/payments.types';
import { renderComponent } from '$lib/components/ui/data-table/render-helpers';
import { formatDistanceToNow } from 'date-fns';
import PaymentActions from './payment-actions.svelte';

export const getPaymentColumns = (onLoadData: () => void): ColumnDef<Payment>[] => [
	{
		accessorKey: 'Id',
		header: 'Payment ID',
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
		accessorKey: 'Amount',
		header: 'Amount',
		cell: ({ row }) => {
			const amount = row.original.Amount || 0;
			return `GH₵ ${amount.toFixed(2)}`;
		}
	},
	{
		accessorKey: 'PaymentStatus',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.original.PaymentStatus;
			switch (status) {
				case 0:
					return 'Pending';
				case 1:
					return 'Paid';
				case 2:
					return 'Failed';
				default:
					return 'Unknown';
			}
		}
	},
	{
		accessorKey: 'Order',
		header: 'Order ID',
		cell: ({ row }) => {
			const orderId = row.original.OrderId;
			return orderId ? `#${orderId.substring(0, 8)}` : 'N/A';
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
			const payment = row.original;
			return renderComponent(PaymentActions, { payment, onLoadData });
		}
	}
];
