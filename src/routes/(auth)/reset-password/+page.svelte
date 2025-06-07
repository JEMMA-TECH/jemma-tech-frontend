<script>
	import { Card, Button, Label, Input, Alert, Spinner } from 'flowbite-svelte';
	import { createForm } from 'felte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let password = '';
	let confirmPassword = '';
	let isLoading = false;
	let error = '';
	let success = false;
	let token = '';

	onMount(() => {
		const id = $derived(page.params.id);
	});

	const { form, errors, data } = createForm({
		onSubmit: async (values) => {
			isLoading = true;
			error = '';
			success = false;

			if (values.password !== values.confirmPassword) {
				error = 'Passwords do not match.';
				isLoading = false;
				return;
			}

			if (!token) {
				error = 'Invalid or missing reset token.';
				isLoading = false;
				return;
			}

			try {
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 1500));

				// Simulate success
				success = true;
			} catch (e) {
				error = 'An error occurred. Please try again.';
			} finally {
				isLoading = false;
			}
		},
		validate: (values) => {
			const errs = {};
			if (!values.password) errs.password = ['Password is required.'];
			if (!values.confirmPassword) errs.confirmPassword = ['Please confirm your password.'];
			if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
				errs.confirmPassword = ['Passwords do not match.'];
			}
			return errs;
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card class="bg-white/80 shadow-none dark:bg-gray-800/80">
		<div class="p-6">
			<div class="mb-4 text-center">
				<h2 class="text-xl font-semibold">Reset your password</h2>
				<p class="text-sm text-neutral-500">Enter your new password below</p>
			</div>

			{#if success}
				<Alert color="green" class="mb-6">
					<span class="font-medium">Success!</span> Your password has been reset. You can now
					<a href="/login" class="underline">log in</a>.
				</Alert>
			{:else if error}
				<Alert color="red" class="mb-6">
					<span class="font-medium">Error!</span>
					{error}
				</Alert>
			{/if}

			<form use:form class="space-y-6" autocomplete="off">
				<!-- New Password Field -->
				<div class="space-y-2">
					<Label for="password" class="text-sm font-semibold text-gray-700 dark:text-gray-300">
						New Password
					</Label>
					<Input
						id="password"
						type="password"
						name="password"
						placeholder="Enter new password"
						bind:value={password}
						required
						class="border-gray-200 transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600"
						disabled={isLoading}
					/>
					{#if $errors.password}
						<p class="text-sm text-red-600 dark:text-red-400">{$errors.password[0]}</p>
					{/if}
				</div>

				<!-- Confirm Password Field -->
				<div class="space-y-2">
					<Label
						for="confirmPassword"
						class="text-sm font-semibold text-gray-700 dark:text-gray-300"
					>
						Confirm Password
					</Label>
					<Input
						id="confirmPassword"
						type="password"
						name="confirmPassword"
						placeholder="Confirm new password"
						bind:value={confirmPassword}
						required
						class="border-gray-200 transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600"
						disabled={isLoading}
					/>
					{#if $errors.confirmPassword}
						<p class="text-sm text-red-600 dark:text-red-400">{$errors.confirmPassword[0]}</p>
					{/if}
				</div>

				<Button
					type="submit"
					class="w-full "
					disabled={isLoading || !password || !confirmPassword}
				>
					{#if isLoading}
						<Spinner class="mr-3" size="4" color="secondary" />
						Resetting password...
					{:else}
						Reset password
					{/if}
				</Button>

				<div class="text-center">
					<a
						href="/login"
						class="text-sm font-medium text-primary-600 transition-colors hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
					>
						Back to login
					</a>
				</div>
			</form>
		</div>
	</Card>
</div>
