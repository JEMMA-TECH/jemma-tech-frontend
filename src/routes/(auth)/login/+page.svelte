<script>
	import { Card, Button, Label, Input, Checkbox, Alert, Spinner } from 'flowbite-svelte';
	import { createForm } from 'felte';
	import { EyeSolid, EyeSlashSolid, EnvelopeOpenSolid, LockOpenSolid } from 'flowbite-svelte-icons';

	let email = '';
	let password = '';
	let showPassword = false;
	let isLoading = false;
	let loginError = '';
	let loginSuccess = false;

	const { form, errors, isSubmitting } = createForm({
		onSubmit: async (values) => {
			isLoading = true;
			loginError = '';

			try {
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 1500));

				// Simulate success/error
				if (values.email === 'demo@example.com' && values.password === 'password') {
					loginSuccess = true;
					// Redirect logic would go here
				} else {
					loginError = 'Invalid email or password. Try demo@example.com / password';
				}
			} catch (error) {
				loginError = 'An error occurred. Please try again.';
			} finally {
				isLoading = false;
			}
		}
	});

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card class="bg-white/80 shadow-none dark:bg-gray-800/80">
		<div class="p-6">
			<div class="mb-4 text-center">
				<h2 class="text-xl font-semibold">Welcome to JemmaTech</h2>
				<p class="text-sm text-neutral-500">Sign in to your account</p>
			</div>

			{#if loginSuccess}
				<Alert color="green" class="mb-6">
					<span class="font-medium">Success!</span> You have been logged in successfully.
				</Alert>
			{:else if loginError}
				<Alert color="red" class="mb-6">
					<span class="font-medium">Error!</span>
					{loginError}
				</Alert>
			{/if}

			<form use:form class="space-y-6" action="/">
				<!-- Email Field -->
				<div class="space-y-2">
					<Label for="email" class="text-sm font-semibold text-gray-700 dark:text-gray-300">
						Email Address
					</Label>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<EnvelopeOpenSolid class="h-5 w-5 text-gray-400" />
						</div>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="Enter your email"
							bind:value={email}
							required
							class="focus:border-primary-500 focus:ring-primary-500 border-gray-200 pl-10 transition-all duration-200 focus:ring-2 dark:border-gray-600"
							disabled={isLoading}
						/>
					</div>
					{#if $errors.email}
						<p class="text-sm text-red-600 dark:text-red-400">{$errors.email[0]}</p>
					{/if}
				</div>

				<!-- Password Field -->
				<div class="space-y-2">
					<Label for="password" class="text-sm font-semibold text-gray-700 dark:text-gray-300">
						Password
					</Label>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<LockOpenSolid class="h-5 w-5 text-gray-400" />
						</div>
						<Input
							id="password"
							type={showPassword ? 'text' : 'password'}
							name="password"
							placeholder="Enter your password"
							bind:value={password}
							required
							class="focus:border-primary-500 focus:ring-primary-500 border-gray-200 pr-10 pl-10 transition-all duration-200 focus:ring-2 dark:border-gray-600"
							disabled={isLoading}
						/>
						<button
							type="button"
							class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
							on:click={togglePasswordVisibility}
							disabled={isLoading}
						>
							{#if showPassword}
								<EyeSlashSolid class="h-5 w-5" />
							{:else}
								<EyeSolid class="h-5 w-5" />
							{/if}
						</button>
					</div>
					{#if $errors.password}
						<p class="text-sm text-red-600 dark:text-red-400">{$errors.password[0]}</p>
					{/if}
				</div>

				<!-- Remember Me & Forgot Password -->
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<Checkbox
							color="primary"
							class="text-primary-500 focus:ring-primary-500"
							disabled={isLoading}
						>
							<span class="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
						</Checkbox>
					</div>
					<a
						href="/forgot-password"
						class="text-primary-500 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-500 text-sm font-medium transition-colors"
					>
						Forgot password?
					</a>
				</div>

				<!-- Submit Button -->
				<Button type="submit" disabled={isLoading || !email || !password} class="w-full">
					{#if isLoading}
						<Spinner class="mr-3" size="4" color="secondary" />
						Signing in...
					{:else}
						Sign in
					{/if}
				</Button>

				<div class="text-center">
					<a
						href="/register"
						class="text-primary-500 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-500 text-sm font-medium transition-colors"
					>
						Don't have an account? Sign up
					</a>
				</div>
			</form>
		</div>
	</Card>
</div>
