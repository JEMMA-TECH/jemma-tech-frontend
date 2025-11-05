<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { sendInvite } from '$svc/invites/invites.service';
	import { toast } from 'svelte-sonner';

	type ModalProps = {
		isOpen: boolean;
		onClose: () => void;
		onSuccess: () => void;
	};

	let { isOpen = $bindable(), onClose, onSuccess }: ModalProps = $props();

	let formData = $state({
		email: ''
	});

	let isSubmitting = $state(false);

	function handleOpenChange(open: boolean) {
		if (!open) {
			onClose();
			resetForm();
		}
	}

	function resetForm() {
		formData = {
			email: ''
		};
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!formData.email.trim()) {
			toast.error('Please enter an email address');
			return;
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			toast.error('Please enter a valid email address');
			return;
		}

		isSubmitting = true;

		const result = await sendInvite({
			email: formData.email.trim()
		});

		isSubmitting = false;

		if (result.IsSuccess) {
			toast.success('Invite sent successfully!');
			onSuccess();
			onClose();
			resetForm();
		} else {
			toast.error(result.Message || 'Failed to send invite');
		}
	}
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title>Send Team Invite</Dialog.Title>
			<Dialog.Description>Invite a team member to join your company.</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<Label for="email">Email Address *</Label>
				<Input
					id="email"
					type="email"
					bind:value={formData.email}
					placeholder="team@example.com"
					required
				/>
			</div>

			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={onClose}>Cancel</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Sending...' : 'Send Invite'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
