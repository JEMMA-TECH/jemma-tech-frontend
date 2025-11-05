import { renderComponent } from '$lib/components/ui/data-table/render-helpers';
import type { Customer } from '$svc/customers/customers.types';
import type { ColumnDef } from '@tanstack/table-core';
import { formatDistanceToNow } from 'date-fns';
import CustomerActions from './customer-actions.svelte';

export const getCustomerColumns = (onLoadData: () => void): ColumnDef<Customer>[] => [
	{
		accessorKey: 'FirstName',
		header: 'First Name'
	},
	{
		accessorKey: 'LastName',
		header: 'Last Name'
	},
	{
		accessorKey: 'Email',
		header: 'Email'
	},
	{
		accessorKey: 'PhoneNumber',
		header: 'Phone Number'
	},
	{
		accessorKey: 'Company.Address',
		header: 'Address',
		cell: ({ row }) => {
			const customer = row.original;
			const address = customer.Company?.Address;
			// Check if address exists and is not empty
			if (address && address.trim() !== '') {
				return address;
			}
			return 'N/A';
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
			const customer = row.original;
			return renderComponent(CustomerActions, { customer, onLoadData });
		}
	}
];
