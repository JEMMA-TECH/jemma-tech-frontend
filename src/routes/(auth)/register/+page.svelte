<script>
	import { Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';

	import { createForm } from 'felte';

	const { form, data: formData } = createForm();
	let step = 1;
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card class="w-full max-w-lg rounded-lg bg-white p-6 shadow-none dark:bg-gray-800">
		<form use:form class="flex flex-col space-y-6" action="/">
			<div class="flex items-center justify-between">
				<h3 class="text-center text-2xl font-semibold text-gray-900 dark:text-white">Register</h3>

				<a href="/login" class="text-primary-500">Already have an account? Login</a>
			</div>
			{#if step === 1}
				<div>
					<h4 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">
						Step 1: Company Details
					</h4>
					<Label class="space-y-2">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</span>
						<div class="mt-1">
							<Input
								type="text"
								name="companyName"
								placeholder="Your Company Name"
								required
								class="focus:ring-primary-500 focus:border-primary-500 rounded-md"
							/><br>
						</div>
					</Label>
					<Label class="space-y-2">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Company Email</span>
						<div class="mt-1">
							<Input
								type="email"
								name="company_email"
								placeholder="company@domain.com"
								required
								class="focus:ring-primary-500 focus:border-primary-500 rounded-md"
							/><br>
						</div>
					</Label>
					<Label class="space-y-2">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Company Address</span
						>
						<div class="mt-1">
							<Input
								type="text"
								name="address"
								placeholder="Enter your Company Address"
								required
								class="focus:ring-primary-500 focus:border-primary-500 rounded-md"
							/><br>
						</div>
					</Label>
					<Label class="space-y-2">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Company Phone</span>
						<div class="mt-1">
							<Input
								type="tel"
								name="phone"
								placeholder="Enter your Company Phone Number"
								required
								class="focus:ring-primary-500 focus:border-primary-500 rounded-md"
							/><br>
						</div>
					</Label>
				</div>
			{/if}

			{#if step === 2}
				<div>
					<h4 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">
						Step 2: User Details
					</h4>
					<div class="grid grid-cols-2 gap-4">
						<Label class="space-y-2">
							<span class="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</span>
							<div class="mt-1">
								<Input
									type="text"
									name="first_name"
									placeholder="John"
									required
									class="focus:ring-primary-500 focus:border-primary-500 rounded-md"
								/><br>
							</div>
						</Label>
						<Label class="space-y-2">
							<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</span>
							<div class="mt-1">
								<Input
									type="text"
									name="last_name"
									placeholder="Doe"
									required
									class="focus:ring-primary-500 focus:border-primary-500 rounded-md"
								/><br>
							</div>
						</Label>
					</div>
					<Label class="space-y-2">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Email</span>
						<div class="mt-1">
							<Input
								type="email"
								name="email"
								placeholder="name@domain.com"
								required
								class="focus:ring-primary-500 focus:border-primary-500 rounded-md"
							/><br>
						</div>
					</Label>
					<Label class="space-y-2">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Password</span>
						<div class="mt-1">
							<Input
								type="password"
								name="password"
								placeholder="••••••••"
								required
								class="focus:ring-primary-500 focus:border-primary-500 rounded-md"
							/><br>
						</div>
					</Label>
					<Label class="space-y-2">
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
							>Confirm Password</span
						>
						<div class="mt-1">
							<Input
								type="password"
								name="confirm_password"
								placeholder="••••••••"
								required
								class="focus:ring-primary-500 focus:border-primary-500 rounded-md"
							/>
						</div>
					</Label>
				</div>
			{/if}

			{#if step === 3}
				<div>
					<h4 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">
						Step 3: Review Details
					</h4>
					<p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
						Please review your details before submitting:
					</p>
					<ul class="list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
						<li>
							<strong>Company Name:</strong>
							{formData.companyName}
							<button
								type="button"
								on:click={() => (step = 1)}
								class="text-primary-500 ml-2 hover:underline">Edit</button
							>
						</li>
						<li>
							<strong>Company Email:</strong>
							{formData.company_email}
							<button
								type="button"
								on:click={() => (step = 1)}
								class="text-primary-500 ml-2 hover:underline">Edit</button
							>
						</li>
						<li>
							<strong>Company Address:</strong>
							{formData.address}
							<button
								type="button"
								on:click={() => (step = 1)}
								class="text-primary-500 ml-2 hover:underline">Edit</button
							>
						</li>
						<li>
							<strong>Company Phone:</strong>
							{formData.phone}
							<button
								type="button"
								on:click={() => (step = 1)}
								class="text-primary-500 ml-2 hover:underline">Edit</button
							>
						</li>
						<li>
							<strong>First Name:</strong>
							{formData.first_name}
							<button
								type="button"
								on:click={() => (step = 2)}
								class="text-primary-500 ml-2 hover:underline">Edit</button
							>
						</li>
						<li>
							<strong>Last Name:</strong>
							{formData.last_name}
							<button
								type="button"
								on:click={() => (step = 2)}
								class="text-primary-500 ml-2 hover:underline">Edit</button
							>
						</li>
						<li>
							<strong>Email:</strong>
							{formData.email}
							<button
								type="button"
								on:click={() => (step = 2)}
								class="text-primary-500 ml-2 hover:underline">Edit</button
							>
						</li>
					</ul>
				</div>
			{/if}

			<div class="flex items-center justify-between">
				<Button
					type="button"
					disabled={step === 1}
					onclick={() => step--}
					class="rounded-md bg-gray-500 px-16 py-3 text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
					>Back</Button
				>
				{#if step < 3}
					<Button
						type="button"
						onclick={() => step++}
						class="bg-primary-500 hover:bg-primary-500 rounded-md px-16 py-3 text-white">Next</Button
					>
				{/if}
				{#if step === 3}
					<Button
						type="submit"
						class="bg-primary-500 hover:bg-primary-500 rounded-md px-16 py-3 text-white"
						>Submit</Button
					>
				{/if}
			</div>
		</form>
	</Card>
</div>
