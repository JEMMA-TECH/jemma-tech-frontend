<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import LoginForm from './login-form.svelte';
	import RegisterForm from './register-form.svelte';

	let activeTab = $state('login');
	let transitioning = $state(false);

	function switchTab(newTab: string) {
		if (newTab === activeTab) return;

		transitioning = true;
		setTimeout(() => {
			activeTab = newTab;
			setTimeout(() => {
				transitioning = false;
			}, 50);
		}, 150);
	}

	function handleRegisterSuccess() {
		switchTab('login');
	}
</script>

<div class="min-h-screen bg-background flex">
	<!-- Left side - Auth Forms -->
	<div class="flex-1 flex items-center justify-center p-8">
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
					<CardTitle class="text-2xl">
						{#if activeTab === 'login'}
							Welcome Back to JEMMA
						{:else}
							Join JEMMA Today
						{/if}
					</CardTitle>
					<CardDescription>
						{#if activeTab === 'login'}
							Sign in to your account to continue managing your laundry business.
						{:else}
							Create your account and start streamlining your laundry operations.
						{/if}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="w-full">
						<!-- Custom Tab List -->
						<div class="grid w-full grid-cols-2 bg-muted p-1 rounded-md mb-6">
							<button
								type="button"
								onclick={() => switchTab('login')}
								class="flex items-center justify-center h-9 px-3 py-2 text-sm font-medium rounded-sm transition-all duration-300 ease-in-out {activeTab === 'login' ? 'bg-teal-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
							>
								Sign In
							</button>
							<button
								type="button"
								onclick={() => switchTab('register')}
								class="flex items-center justify-center h-9 px-3 py-2 text-sm font-medium rounded-sm transition-all duration-300 ease-in-out {activeTab === 'register' ? 'bg-teal-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
							>
								Sign Up
							</button>
						</div>

						<!-- Tab Content with smooth transitions -->
						<div class="relative">
							{#if activeTab === 'login'}
								<div
									class="transition-all duration-300 ease-in-out {transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}"
								>
									<LoginForm />
								</div>
							{:else}
								<div
									class="transition-all duration-300 ease-in-out {transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}"
								>
									<RegisterForm onSuccess={handleRegisterSuccess} />
								</div>
							{/if}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>

	<!-- Right side - Hero Section -->
	<div class="hidden lg:flex flex-1 bg-gradient-to-br from-teal-600 to-teal-800 items-center justify-center p-12">
		<div class="max-w-md text-white">
			<h2 class="text-4xl font-bold mb-6">Unified Hub for Smarter Laundry Management</h2>
			<p class="text-lg text-teal-50 mb-8">
				Streamline your laundry operations with JEMMA. Manage orders, track customers, handle
				payments, and grow your business - all in one powerful platform.
			</p>
			<div class="space-y-4">
				<div class="flex items-start gap-3">
					<div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-1">
						<span class="text-xs">✓</span>
					</div>
					<div>
						<h3 class="font-semibold mb-1">Real-time Order Tracking</h3>
						<p class="text-sm text-teal-50">
							Monitor your orders from pickup to delivery with ease
						</p>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-1">
						<span class="text-xs">✓</span>
					</div>
					<div>
						<h3 class="font-semibold mb-1">Customer Management</h3>
						<p class="text-sm text-teal-50">
							Build lasting relationships with your customers
						</p>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-1">
						<span class="text-xs">✓</span>
					</div>
					<div>
						<h3 class="font-semibold mb-1">Payment Processing</h3>
						<p class="text-sm text-teal-50">
							Accept multiple payment methods with secure transactions
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
