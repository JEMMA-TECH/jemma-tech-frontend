<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';
	import { toast } from 'svelte-sonner';
	import { login, register } from '$services/auth/auth.service';
	import { goto } from '$app/navigation';
	import { Eye, EyeOff } from 'lucide-svelte';

	// Login form data
	let loginData = {
		email: '',
		password: ''
	};

	// Register form data
	let registerData = {
		companyName: '',
		address: '',
		companyEmail: '',
		companyPhone: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: ''
	};

	let loginLoading = false;
	let registerLoading = false;
	let activeTab = 'login';
	let transitioning = false;

	// Password visibility states
	let showLoginPassword = false;
	let showRegisterPassword = false;
	let showConfirmPassword = false;

	// Password strength calculation
	$: passwordStrength = calculatePasswordStrength(registerData.password);
	$: passwordsMatch = registerData.password === registerData.confirmPassword;

	// Form validation
	$: loginFormValid = loginData.email.trim() !== '' && loginData.password.trim() !== '';
	$: registerFormValid =
		registerData.companyName.trim() !== '' &&
		registerData.address.trim() !== '' &&
		registerData.companyEmail.trim() !== '' &&
		registerData.companyPhone.trim() !== '' &&
		registerData.firstName.trim() !== '' &&
		registerData.lastName.trim() !== '' &&
		registerData.email.trim() !== '' &&
		registerData.phone.trim() !== '' &&
		registerData.password.trim() !== '' &&
		registerData.confirmPassword.trim() !== '' &&
		passwordsMatch &&
		passwordStrength.score >= 3;

	// Handle tab switching with smooth transitions
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

	function calculatePasswordStrength(password: string): { score: number; text: string; color: string } {
		if (!password) return { score: 0, text: '', color: '' };

		let score = 0;
		const checks = [
			password.length >= 8,
			/[a-z]/.test(password),
			/[A-Z]/.test(password),
			/[0-9]/.test(password),
			/[^A-Za-z0-9]/.test(password)
		];

		score = checks.filter(Boolean).length;

		const levels = [
			{ score: 0, text: '', color: '' },
			{ score: 1, text: 'Very Weak', color: 'bg-red-500' },
			{ score: 2, text: 'Weak', color: 'bg-orange-500' },
			{ score: 3, text: 'Fair', color: 'bg-yellow-500' },
			{ score: 4, text: 'Good', color: 'bg-blue-500' },
			{ score: 5, text: 'Strong', color: 'bg-green-500' }
		];

		return levels[score];
	}

	async function handleLogin() {
		loginLoading = true;
		const result = await login(loginData);

		if (result.IsSuccess) {
			toast.success(result.Message || 'Welcome back! Login successful.');
			goto('/private/dashboard');
		} else {
			toast.error(result.Message || 'Login failed. Please check your credentials.');
		}
		loginLoading = false;
	}

	async function handleRegister() {
		registerLoading = true;
		const { confirmPassword, ...dataToSend } = registerData;
		const result = await register(dataToSend);

		if (result.IsSuccess) {
			toast.success(result.Message || 'Account created successfully! Please sign in.');
			activeTab = 'login';
			// Clear form
			registerData = {
				companyName: '', address: '', companyEmail: '', companyPhone: '',
				firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
			};
		} else {
			toast.error(result.Message || 'Registration failed. Please try again.');
		}
		registerLoading = false;
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
				<CardHeader className="text-center">
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
									class="space-y-4 transition-all duration-300 ease-in-out {transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}"
								>
							<div class="space-y-2">
								<Label for="login-email">Email Address</Label>
								<Input
									id="login-email"
									type="email"
									placeholder="Enter your email address"
									bind:value={loginData.email}
									disabled={loginLoading}
								/>
							</div>
							<div class="space-y-2">
								<Label for="login-password">Password</Label>
								<div class="relative">
									<Input
										id="login-password"
										type={showLoginPassword ? 'text' : 'password'}
										placeholder="Enter your password"
										bind:value={loginData.password}
										disabled={loginLoading}
										class="pr-10"
									/>
									<button
										type="button"
										onclick={() => showLoginPassword = !showLoginPassword}
										class="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
										disabled={loginLoading}
									>
										{#if showLoginPassword}
											<EyeOff class="h-4 w-4" />
										{:else}
											<Eye class="h-4 w-4" />
										{/if}
									</button>
								</div>
							</div>
							<div class="flex justify-end">
								<a href="/forgot-password" class="text-sm text-teal-600 hover:underline">
									Forgot Password?
								</a>
							</div>
								<Button
									class="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
									onclick={handleLogin}
									disabled={loginLoading || !loginFormValid}
								>
									{loginLoading ? 'Signing in...' : 'Sign In'}
								</Button>
								</div>
							{/if}

							{#if activeTab === 'register'}
								<div
									class="space-y-4 transition-all duration-300 ease-in-out {transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}"
								>
							<!-- Company Information -->
							<div class="space-y-4">
								<h3 class="font-medium text-sm text-muted-foreground">Company Information</h3>
								<div class="grid grid-cols-2 gap-4">
									<div class="space-y-2">
										<Label for="company-name">Company Name</Label>
										<Input
											id="company-name"
											type="text"
											placeholder="Company name"
											bind:value={registerData.companyName}
											disabled={registerLoading}
										/>
									</div>
									<div class="space-y-2">
										<Label for="company-phone">Company Phone</Label>
										<Input
											id="company-phone"
											type="tel"
											placeholder="Phone number"
											bind:value={registerData.companyPhone}
											disabled={registerLoading}
										/>
									</div>
								</div>
								<div class="space-y-2">
									<Label for="company-email">Company Email</Label>
									<Input
										id="company-email"
										type="email"
										placeholder="company@example.com"
										bind:value={registerData.companyEmail}
										disabled={registerLoading}
									/>
								</div>
								<div class="space-y-2">
									<Label for="address">Address</Label>
									<Input
										id="address"
										type="text"
										placeholder="Company address"
										bind:value={registerData.address}
										disabled={registerLoading}
									/>
								</div>
							</div>

							<!-- Personal Information -->
							<div class="space-y-4">
								<h3 class="font-medium text-sm text-muted-foreground">Personal Information</h3>
								<div class="grid grid-cols-2 gap-4">
									<div class="space-y-2">
										<Label for="first-name">First Name</Label>
										<Input
											id="first-name"
											type="text"
											placeholder="First name"
											bind:value={registerData.firstName}
											disabled={registerLoading}
										/>
									</div>
									<div class="space-y-2">
										<Label for="last-name">Last Name</Label>
										<Input
											id="last-name"
											type="text"
											placeholder="Last name"
											bind:value={registerData.lastName}
											disabled={registerLoading}
										/>
									</div>
								</div>
								<div class="grid grid-cols-2 gap-4">
									<div class="space-y-2">
										<Label for="email">Email</Label>
										<Input
											id="email"
											type="email"
											placeholder="your@example.com"
											bind:value={registerData.email}
											disabled={registerLoading}
										/>
									</div>
									<div class="space-y-2">
										<Label for="phone">Phone</Label>
										<Input
											id="phone"
											type="tel"
											placeholder="Phone number"
											bind:value={registerData.phone}
											disabled={registerLoading}
										/>
									</div>
								</div>
							</div>

							<!-- Password -->
							<div class="space-y-4">
								<h3 class="font-medium text-sm text-muted-foreground">Security</h3>
								<div class="space-y-2">
									<Label for="password">Password</Label>
									<div class="relative">
										<Input
											id="password"
											type={showRegisterPassword ? 'text' : 'password'}
											placeholder="Enter your password"
											bind:value={registerData.password}
											disabled={registerLoading}
											class="pr-10"
										/>
										<button
											type="button"
											onclick={() => showRegisterPassword = !showRegisterPassword}
											class="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
											disabled={registerLoading}
										>
											{#if showRegisterPassword}
												<EyeOff class="h-4 w-4" />
											{:else}
												<Eye class="h-4 w-4" />
											{/if}
										</button>
									</div>
									{#if registerData.password}
										<div class="space-y-2">
											<div class="flex justify-between text-sm">
												<span>Password strength</span>
												<span class="text-muted-foreground">{passwordStrength.text}</span>
											</div>
											<Progress
												value={(passwordStrength.score / 5) * 100}
												class="h-2 {passwordStrength.color}"
											/>
										</div>
									{/if}
								</div>
								<div class="space-y-2">
									<Label for="confirm-password">Confirm Password</Label>
									<div class="relative">
										<Input
											id="confirm-password"
											type={showConfirmPassword ? 'text' : 'password'}
											placeholder="Confirm your password"
											bind:value={registerData.confirmPassword}
											disabled={registerLoading}
											class="pr-10 {registerData.confirmPassword && !passwordsMatch ? 'border-red-500' : ''}"
										/>
										<button
											type="button"
											onclick={() => showConfirmPassword = !showConfirmPassword}
											class="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
											disabled={registerLoading}
										>
											{#if showConfirmPassword}
												<EyeOff class="h-4 w-4" />
											{:else}
												<Eye class="h-4 w-4" />
											{/if}
										</button>
									</div>
									{#if registerData.confirmPassword && !passwordsMatch}
										<p class="text-sm text-red-500">Passwords do not match</p>
									{/if}
								</div>
							</div>

								<Button
									class="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
									onclick={handleRegister}
									disabled={registerLoading || !registerFormValid}
								>
									{registerLoading ? 'Creating Account...' : 'Create Account'}
								</Button>
								</div>
							{/if}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>

	<!-- Right side - Image/Branding -->
	<div class="hidden lg:flex flex-1 bg-teal-600 items-center justify-center p-8">
		<div class="text-center text-white space-y-6 max-w-md">
			<div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto">
				<span class="text-4xl font-bold">J</span>
			</div>
			<h2 class="text-3xl font-bold">A Unified Hub for Smarter Laundry Management</h2>
			<p class="text-teal-100">
				JEMMA empowers you with a unified laundry command center—delivering deep insights
				and a 360° view of your entire laundry business operations.
			</p>
			<div class="flex justify-center space-x-2 pt-4">
				<div class="w-8 h-2 bg-white rounded-full"></div>
				<div class="w-2 h-2 bg-white/50 rounded-full"></div>
				<div class="w-2 h-2 bg-white/50 rounded-full"></div>
				<div class="w-2 h-2 bg-white/50 rounded-full"></div>
			</div>
		</div>
	</div>
</div>