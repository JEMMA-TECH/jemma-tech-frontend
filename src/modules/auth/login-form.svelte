<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import { login } from '$svc/auth/auth.service';
	import { goto } from '$app/navigation';
	import { Eye, EyeOff } from 'lucide-svelte';

	// Login form data
	let loginData = $state({
		email: '',
		password: ''
	});

	let loginLoading = $state(false);
	let showPassword = $state(false);

	// Form validation
	let formValid = $derived(
		loginData.email.trim() !== '' &&
		loginData.password.trim() !== ''
	);

	async function handleLogin() {
		if (!formValid) return;

		loginLoading = true;
		const result = await login(loginData);

		if (result.IsSuccess) {
			toast.success(result.Message || 'Welcome back! Login successful.');
			goto('/dashboard');
		} else {
			toast.error(result.Message || 'Login failed. Please check your credentials.');
		}
		loginLoading = false;
	}
</script>

<form onsubmit={(e) => { e.preventDefault(); handleLogin(); }} class="space-y-4">
	<div class="space-y-2">
		<Label for="login-email">Email Address</Label>
		<Input
			id="login-email"
			type="email"
			placeholder="Enter your email address"
			bind:value={loginData.email}
			disabled={loginLoading}
			required
		/>
	</div>

	<div class="space-y-2">
		<Label for="login-password">Password</Label>
		<div class="relative">
			<Input
				id="login-password"
				type={showPassword ? 'text' : 'password'}
				placeholder="Enter your password"
				bind:value={loginData.password}
				disabled={loginLoading}
				class="pr-10"
				required
			/>
			<button
				type="button"
				onclick={() => showPassword = !showPassword}
				class="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
				tabindex="-1"
			>
				{#if showPassword}
					<EyeOff class="w-4 h-4" />
				{:else}
					<Eye class="w-4 h-4" />
				{/if}
			</button>
		</div>
	</div>

	<div class="flex items-center justify-end">
		<a href="/forgot-password" class="text-sm text-teal-600 hover:underline">
			Forgot password?
		</a>
	</div>

	<Button type="submit" class="w-full" disabled={!formValid || loginLoading}>
		{#if loginLoading}
			Signing in...
		{:else}
			Sign In
		{/if}
	</Button>
</form>
