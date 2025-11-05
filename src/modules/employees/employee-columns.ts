import type { ColumnDef } from '@tanstack/table-core';
import type { Employee } from '$svc/employees/employees.types';
import EmployeeActions from './employee-actions.svelte';

export function getEmployeeColumns(): ColumnDef<Employee>[] {
	return [
		{
			accessorKey: 'FirstName',
			header: 'First Name',
			cell: ({ row }) => row.original.FirstName
		},
		{
			accessorKey: 'LastName',
			header: 'Last Name',
			cell: ({ row }) => row.original.LastName
		},
		{
			accessorKey: 'Email',
			header: 'Email',
			cell: ({ row }) => row.original.Email
		},
		{
			accessorKey: 'Role',
			header: 'Role',
			cell: ({ row }) => row.original.Role || 'N/A'
		},
		{
			accessorKey: 'IsActive',
			header: 'Status',
			cell: ({ row }) => {
				return row.original.IsActive ? 'Active' : 'Inactive';
			}
		},
		{
			accessorKey: 'CreatedAt',
			header: 'Created',
			cell: ({ row }) => {
				const date = new Date(row.original.CreatedAt);
				return date.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				});
			}
		},
		{
			id: 'actions',
			header: 'Actions',
			cell: ({ row }) => {
				return {
					component: EmployeeActions,
					props: {
						employee: row.original
					}
				};
			}
		}
	];
}
