<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import type { Customer } from '$svc/customers/customers.types';
	import { formatDistanceToNow, format } from 'date-fns';
	import { User, Mail, Phone, MapPin, Calendar, Building, ChevronDown } from 'lucide-svelte';

	type ModalProps = {
		isOpen: boolean;
		customer: Customer;
		onClose: () => void;
	};

	let { isOpen = $bindable(), customer, onClose }: ModalProps = $props();

	// State for each collapsible section (first 2 open by default)
	let personalInfoOpen = $state(true);
	let contactInfoOpen = $state(true);
	let companyInfoOpen = $state(false);
	let systemInfoOpen = $state(false);
	let timestampsOpen = $state(false);

	function handleOpenChange(open: boolean) {
		if (!open) {
			onClose();
		}
	}

	function formatDate(dateString: string) {
		try {
			const date = new Date(dateString);
			return {
				relative: formatDistanceToNow(date, { addSuffix: true }),
				absolute: format(date, 'PPpp') // e.g., "Apr 29, 2025, 9:30:00 AM"
			};
		} catch {
			return { relative: 'N/A', absolute: 'N/A' };
		}
	}

	const createdDate = $derived(formatDate(customer.CreatedAt));
	const updatedDate = $derived(formatDate(customer.UpdatedAt));
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Content class="max-w-3xl max-h-[90vh] overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title class="text-2xl">Customer Details</Dialog.Title>
			<Dialog.Description>View complete information about this customer.</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4 mt-4">
			<!-- Personal Information Section -->
			<Collapsible.Root bind:open={personalInfoOpen}>
				<Collapsible.Trigger class="flex w-full items-center justify-between rounded-lg border bg-card p-4 hover:bg-accent transition-colors">
					<div class="flex items-center gap-2">
						<User class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-semibold">Personal Information</h3>
					</div>
					<ChevronDown class="h-5 w-5 transition-transform duration-200 {personalInfoOpen ? 'rotate-180' : ''}" />
				</Collapsible.Trigger>
				<Collapsible.Content class="pt-4">
					<div class="grid gap-4 sm:grid-cols-2 bg-muted/50 p-4 rounded-lg">
						<div class="space-y-1">
							<Label class="text-xs text-muted-foreground">First Name</Label>
							<p class="text-sm font-medium">{customer.FirstName}</p>
						</div>
						<div class="space-y-1">
							<Label class="text-xs text-muted-foreground">Last Name</Label>
							<p class="text-sm font-medium">{customer.LastName}</p>
						</div>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- Contact Information Section -->
			<Collapsible.Root bind:open={contactInfoOpen}>
				<Collapsible.Trigger class="flex w-full items-center justify-between rounded-lg border bg-card p-4 hover:bg-accent transition-colors">
					<div class="flex items-center gap-2">
						<Mail class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-semibold">Contact Information</h3>
					</div>
					<ChevronDown class="h-5 w-5 transition-transform duration-200 {contactInfoOpen ? 'rotate-180' : ''}" />
				</Collapsible.Trigger>
				<Collapsible.Content class="pt-4">
					<div class="space-y-3 bg-muted/50 p-4 rounded-lg">
						<div class="flex items-start gap-3">
							<Mail class="h-4 w-4 text-muted-foreground mt-0.5" />
							<div class="space-y-1 flex-1">
								<Label class="text-xs text-muted-foreground">Email Address</Label>
								<p class="text-sm font-medium break-all">{customer.Email}</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Phone class="h-4 w-4 text-muted-foreground mt-0.5" />
							<div class="space-y-1 flex-1">
								<Label class="text-xs text-muted-foreground">Phone Number</Label>
								<p class="text-sm font-medium">{customer.PhoneNumber}</p>
							</div>
						</div>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- Company Information Section -->
			<Collapsible.Root bind:open={companyInfoOpen}>
				<Collapsible.Trigger class="flex w-full items-center justify-between rounded-lg border bg-card p-4 hover:bg-accent transition-colors">
					<div class="flex items-center gap-2">
						<Building class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-semibold">Company Information</h3>
					</div>
					<ChevronDown class="h-5 w-5 transition-transform duration-200 {companyInfoOpen ? 'rotate-180' : ''}" />
				</Collapsible.Trigger>
				<Collapsible.Content class="pt-4">
					<div class="space-y-3 bg-muted/50 p-4 rounded-lg">
						<div class="flex items-start gap-3">
							<Building class="h-4 w-4 text-muted-foreground mt-0.5" />
							<div class="space-y-1 flex-1">
								<Label class="text-xs text-muted-foreground">Company Name</Label>
								<p class="text-sm font-medium">{customer.Company?.Name || 'N/A'}</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<MapPin class="h-4 w-4 text-muted-foreground mt-0.5" />
							<div class="space-y-1 flex-1">
								<Label class="text-xs text-muted-foreground">Company Address</Label>
								<p class="text-sm font-medium">
									{customer.Company?.Address && customer.Company.Address.trim() !== ''
										? customer.Company.Address
										: 'No address provided'}
								</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Phone class="h-4 w-4 text-muted-foreground mt-0.5" />
							<div class="space-y-1 flex-1">
								<Label class="text-xs text-muted-foreground">Company Phone</Label>
								<p class="text-sm font-medium">{customer.Company?.PhoneNumber || 'N/A'}</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Mail class="h-4 w-4 text-muted-foreground mt-0.5" />
							<div class="space-y-1 flex-1">
								<Label class="text-xs text-muted-foreground">Company Email</Label>
								<p class="text-sm font-medium break-all">{customer.Company?.Email || 'N/A'}</p>
							</div>
						</div>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- System Information Section -->
			<Collapsible.Root bind:open={systemInfoOpen}>
				<Collapsible.Trigger class="flex w-full items-center justify-between rounded-lg border bg-card p-4 hover:bg-accent transition-colors">
					<div class="flex items-center gap-2">
						<Calendar class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-semibold">System Information</h3>
					</div>
					<ChevronDown class="h-5 w-5 transition-transform duration-200 {systemInfoOpen ? 'rotate-180' : ''}" />
				</Collapsible.Trigger>
				<Collapsible.Content class="pt-4">
					<div class="space-y-3 bg-muted/50 p-4 rounded-lg">
						<div class="flex items-start gap-3">
							<div class="h-4 w-4 rounded bg-primary/20 mt-0.5" />
							<div class="space-y-1 flex-1">
								<Label class="text-xs text-muted-foreground">Customer ID</Label>
								<p class="text-sm font-mono text-muted-foreground">{customer.Id}</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<div class="h-4 w-4 rounded bg-primary/20 mt-0.5" />
							<div class="space-y-1 flex-1">
								<Label class="text-xs text-muted-foreground">Company ID</Label>
								<p class="text-sm font-mono text-muted-foreground">{customer.CompanyId}</p>
							</div>
						</div>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- Timestamps Section -->
			<Collapsible.Root bind:open={timestampsOpen}>
				<Collapsible.Trigger class="flex w-full items-center justify-between rounded-lg border bg-card p-4 hover:bg-accent transition-colors">
					<div class="flex items-center gap-2">
						<Calendar class="h-5 w-5 text-primary" />
						<h3 class="text-lg font-semibold">Activity Timestamps</h3>
					</div>
					<ChevronDown class="h-5 w-5 transition-transform duration-200 {timestampsOpen ? 'rotate-180' : ''}" />
				</Collapsible.Trigger>
				<Collapsible.Content class="pt-4">
					<div class="grid gap-4 sm:grid-cols-2 bg-muted/50 p-4 rounded-lg">
						<div class="space-y-1">
							<Label class="text-xs text-muted-foreground">Created</Label>
							<p class="text-sm font-medium">{createdDate.relative}</p>
							<p class="text-xs text-muted-foreground">{createdDate.absolute}</p>
						</div>
						<div class="space-y-1">
							<Label class="text-xs text-muted-foreground">Last Updated</Label>
							<p class="text-sm font-medium">{updatedDate.relative}</p>
							<p class="text-xs text-muted-foreground">{updatedDate.absolute}</p>
						</div>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
		</div>

		<Dialog.Footer class="mt-6">
			<Button variant="outline" onclick={onClose}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
