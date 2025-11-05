<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { toast } from 'svelte-sonner';
	import { Mail, CheckCircle } from 'lucide-svelte';

	let email = $state('');
	let loading = $state(false);
	let submitted = $state(false);

	let formValid = $derived(email.trim() !== '' && email.includes('@'));

	async function handleSubmit() {
		if (!formValid) return;

		loading = true;

		// Simulate API call - replace with actual API integration
		await new Promise((resolve) => setTimeout(resolve, 1500));

		toast.success('Password reset link sent to your email');
		submitted = true;
		loading = false;
	}
</script>

<div class="min-h-screen bg-background flex items-center justify-center p-8">
	<div class="w-full max-w-md">
		<!-- Logo/Brand -->
		<div class="flex items-center justify-center mb-8">
			<div class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
				<span class="text-white font-bold text-xl">J</span>
			</div>
			<span class="ml-3 text-2xl font-bold">JEMMA</span>
		</div>

		<Card>
			<CardHeader class="text-center">
				<div class="mx-auto w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-4">
					{#if submitted}
						<CheckCircle class="w-6 h-6 text-teal-600" />
					{:else}
						<Mail class="w-6 h-6 text-teal-600" />
					{/if}
				</div>
				<CardTitle class="text-2xl">
					{#if submitted}
						Check Your Email
					{:else}
						Forgot Password?
					{/if}
				</CardTitle>
				<CardDescription>
					{#if submitted}
						We've sent a password reset link to <strong>{email}</strong>
					{:else}
						No worries! Enter your email address and we'll send you a link to reset your password.
					{/if}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{#if !submitted}
					<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
						<div class="space-y-2">
							<Label for="email">Email Address</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email address"
								bind:value={email}
								disabled={loading}
								required
							/>
						</div>

						<Button type="submit" class="w-full" disabled={!formValid || loading}>
							{#if loading}
								Sending Reset Link...
							{:else}
								Send Reset Link
							{/if}
						</Button>

						<div class="text-center">
							<a href="/init" class="text-sm text-teal-600 hover:underline">
								Back to Sign In
							</a>
						</div>
					</form>
				{:else}
					<div class="space-y-4">
						<div class="bg-teal-50 border border-teal-200 rounded-lg p-4">
							<p class="text-sm text-teal-800">
								Please check your inbox and click on the link to reset your password. The link will expire in 1 hour.
							</p>
						</div>

						<Button onclick={() => submitted = false} variant="outline" class="w-full">
							Resend Email
						</Button>

						<div class="text-center">
							<a href="/init" class="text-sm text-teal-600 hover:underline">
								Back to Sign In
							</a>
						</div>
					</div>
				{/if}
			</CardContent>
		</Card>
	</div>
</div>
