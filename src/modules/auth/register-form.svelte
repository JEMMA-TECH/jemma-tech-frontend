<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Progress } from '$lib/components/ui/progress';
	import { toast } from 'svelte-sonner';
	import { register } from '$svc/auth/auth.service';
	import { Eye, EyeOff, ArrowLeft } from 'lucide-svelte';

	interface Props {
		onSuccess?: () => void;
	}

	let { onSuccess }: Props = $props();

	// Register form data
	let registerData = $state({
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
	});

	let registerLoading = $state(false);
	let registrationStep = $state(1);
	let stepTransitioning = $state(false);
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	// Password strength calculation
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

	let passwordStrength = $derived(calculatePasswordStrength(registerData.password));
	let passwordsMatch = $derived(registerData.password === registerData.confirmPassword);

	// Step-based validation
	let step1Valid = $derived(
		registerData.firstName.trim() !== '' &&
		registerData.lastName.trim() !== '' &&
		registerData.email.trim() !== '' &&
		registerData.phone.trim() !== '' &&
		registerData.password.trim() !== '' &&
		registerData.confirmPassword.trim() !== '' &&
		passwordsMatch &&
		passwordStrength.score >= 3
	);

	let step2Valid = $derived(
		registerData.companyName.trim() !== '' &&
		registerData.address.trim() !== '' &&
		registerData.companyEmail.trim() !== '' &&
		registerData.companyPhone.trim() !== ''
	);

	function nextStep() {
		if (registrationStep === 1 && step1Valid) {
			stepTransitioning = true;
			setTimeout(() => {
				registrationStep = 2;
				stepTransitioning = false;
			}, 150);
		}
	}

	function previousStep() {
		if (registrationStep === 2) {
			stepTransitioning = true;
			setTimeout(() => {
				registrationStep = 1;
				stepTransitioning = false;
			}, 150);
		}
	}

	async function handleRegister() {
		if (!step2Valid) return;

		registerLoading = true;
		const { confirmPassword, ...dataToSend } = registerData;
		const result = await register(dataToSend);

		if (result.IsSuccess) {
			toast.success(result.Message || 'Account created successfully! Please sign in.');
			// Clear form
			registerData = {
				companyName: '', address: '', companyEmail: '', companyPhone: '',
				firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
			};
			registrationStep = 1;
			onSuccess?.();
		} else {
			toast.error(result.Message || 'Registration failed. Please try again.');
		}
		registerLoading = false;
	}
</script>

<form onsubmit={(e) => { e.preventDefault(); registrationStep === 2 ? handleRegister() : nextStep(); }} class="space-y-4">
	<!-- Progress Indicator -->
	<div class="mb-6">
		<div class="flex items-center justify-between mb-2">
			<span class="text-sm font-medium text-muted-foreground">
				Step {registrationStep} of 2
			</span>
			<span class="text-sm font-medium text-muted-foreground">
				{registrationStep === 1 ? 'Personal Info' : 'Company Info'}
			</span>
		</div>
		<Progress value={(registrationStep / 2) * 100} class="h-2" />
	</div>

	<div class="transition-all duration-300 {stepTransitioning ? 'opacity-0' : 'opacity-100'}">
		{#if registrationStep === 1}
			<!-- Step 1: Personal Information -->
			<div class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="firstName">First Name</Label>
						<Input
							id="firstName"
							placeholder="John"
							bind:value={registerData.firstName}
							disabled={registerLoading}
							required
						/>
					</div>
					<div class="space-y-2">
						<Label for="lastName">Last Name</Label>
						<Input
							id="lastName"
							placeholder="Doe"
							bind:value={registerData.lastName}
							disabled={registerLoading}
							required
						/>
					</div>
				</div>

				<div class="space-y-2">
					<Label for="email">Email Address</Label>
					<Input
						id="email"
						type="email"
						placeholder="john@example.com"
						bind:value={registerData.email}
						disabled={registerLoading}
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="phone">Phone Number</Label>
					<Input
						id="phone"
						type="tel"
						placeholder="+1234567890"
						bind:value={registerData.phone}
						disabled={registerLoading}
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="password">Password</Label>
					<div class="relative">
						<Input
							id="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="Create a strong password"
							bind:value={registerData.password}
							disabled={registerLoading}
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

					{#if registerData.password}
						<div class="mt-2">
							<div class="flex items-center justify-between mb-1">
								<span class="text-xs text-muted-foreground">Password strength:</span>
								<span class="text-xs font-medium {passwordStrength.text === 'Strong' || passwordStrength.text === 'Good' ? 'text-green-600' : 'text-orange-600'}">
									{passwordStrength.text}
								</span>
							</div>
							<Progress value={(passwordStrength.score / 5) * 100} class="h-1.5 {passwordStrength.color}" />
						</div>
					{/if}
				</div>

				<div class="space-y-2">
					<Label for="confirmPassword">Confirm Password</Label>
					<div class="relative">
						<Input
							id="confirmPassword"
							type={showConfirmPassword ? 'text' : 'password'}
							placeholder="Confirm your password"
							bind:value={registerData.confirmPassword}
							disabled={registerLoading}
							class="pr-10 {registerData.confirmPassword && !passwordsMatch ? 'border-red-500' : ''}"
							required
						/>
						<button
							type="button"
							onclick={() => showConfirmPassword = !showConfirmPassword}
							class="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
							tabindex="-1"
						>
							{#if showConfirmPassword}
								<EyeOff class="w-4 h-4" />
							{:else}
								<Eye class="w-4 h-4" />
							{/if}
						</button>
					</div>
					{#if registerData.confirmPassword && !passwordsMatch}
						<p class="text-xs text-red-500">Passwords do not match</p>
					{/if}
				</div>

				<Button type="submit" class="w-full" disabled={!step1Valid || registerLoading}>
					Continue to Company Info
				</Button>
			</div>

		{:else}
			<!-- Step 2: Company Information -->
			<div class="space-y-4">
				<div class="space-y-2">
					<Label for="companyName">Company Name</Label>
					<Input
						id="companyName"
						placeholder="ACME Laundry"
						bind:value={registerData.companyName}
						disabled={registerLoading}
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="address">Business Address</Label>
					<Input
						id="address"
						placeholder="123 Main St, City, Country"
						bind:value={registerData.address}
						disabled={registerLoading}
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="companyEmail">Company Email</Label>
					<Input
						id="companyEmail"
						type="email"
						placeholder="info@company.com"
						bind:value={registerData.companyEmail}
						disabled={registerLoading}
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="companyPhone">Company Phone</Label>
					<Input
						id="companyPhone"
						type="tel"
						placeholder="+1234567890"
						bind:value={registerData.companyPhone}
						disabled={registerLoading}
						required
					/>
				</div>

				<div class="flex gap-2">
					<Button type="button" variant="outline" class="flex-1" onclick={previousStep} disabled={registerLoading}>
						<ArrowLeft class="w-4 h-4 mr-2" />
						Back
					</Button>
					<Button type="submit" class="flex-1" disabled={!step2Valid || registerLoading}>
						{#if registerLoading}
							Creating Account...
						{:else}
							Create Account
						{/if}
					</Button>
				</div>
			</div>
		{/if}
	</div>
</form>
