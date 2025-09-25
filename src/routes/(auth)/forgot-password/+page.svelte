<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { toast } from 'svelte-sonner';
	import { ArrowLeft } from 'lucide-svelte';

	let email = '';
	let loading = false;
	let sent = false;

	async function handleForgotPassword() {
		if (!email) {
			toast.error('Please enter your email address');
			return;
		}

		loading = true;

		// TODO: Implement actual forgot password API call
		setTimeout(() => {
			sent = true;
			loading = false;
			toast.success('Password reset instructions sent to your email');
		}, 1000);
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
			<CardHeader className="text-center">
				<CardTitle class="text-2xl">
					{sent ? 'Check Your Email' : 'Forgot Password?'}
				</CardTitle>
				<CardDescription>
					{sent
						? 'We\'ve sent password reset instructions to your email address.'
						: 'Enter your email address and we\'ll send you instructions to reset your password.'}
				</CardDescription>
			</CardHeader>
			<CardContent class="space-y-4">
				{#if !sent}
					<div class="space-y-2">
						<Label for="email">Email Address</Label>
						<Input
							id="email"
							type="email"
							placeholder="Enter your email address"
							bind:value={email}
							disabled={loading}
						/>
					</div>
					<Button
						class="w-full bg-teal-600 hover:bg-teal-700"
						onclick={handleForgotPassword}
						disabled={loading}
					>
						{loading ? 'Sending...' : 'Send Reset Instructions'}
					</Button>
				{:else}
					<div class="text-center py-4">
						<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
						</div>
						<p class="text-sm text-muted-foreground mb-4">
							If an account with that email exists, you'll receive an email shortly.
						</p>
						<Button
							variant="outline"
							class="w-full"
							onclick={() => { sent = false; email = ''; }}
						>
							Send Another Email
						</Button>
					</div>
				{/if}

				<div class="text-center pt-4 border-t">
					<a href="/init" class="inline-flex items-center text-sm text-teal-600 hover:underline">
						<ArrowLeft class="w-4 h-4 mr-2" />
						Back to Sign In
					</a>
				</div>
			</CardContent>
		</Card>
	</div>
</div>