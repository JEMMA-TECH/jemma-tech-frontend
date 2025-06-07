<script>
    import { Card, Button, Label, Input, Alert, Spinner } from 'flowbite-svelte';
    import { createForm } from 'felte';
    import { EnvelopeOpenSolid } from 'flowbite-svelte-icons';

    let email = '';
    let isLoading = false;
    let error = '';
    let success = false;

    const { form, errors } = createForm({
        onSubmit: async (values) => {
            isLoading = true;
            error = '';
            success = false;

            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1500));

                // Simulate success/error
                if (values.email === 'demo@example.com') {
                    success = true;
                } else {
                    error = 'No account found with that email address.';
                }
            } catch (e) {
                error = 'An error occurred. Please try again.';
            } finally {
                isLoading = false;
            }
        }
    });
</script>

<div class="flex min-h-screen items-center justify-center">
    <Card class="bg-white/80 shadow-none dark:bg-gray-800/80">
        <div class="p-6">
            <div class="mb-4 text-center">
                <h2 class="font-semibold text-xl">Forgot your password?</h2>
                <p class="text-sm text-neutral-500">Enter your email to reset your password</p>
            </div>

            {#if success}
                <Alert color="green" class="mb-6">
                    <span class="font-medium">Success!</span> If an account exists for this email, a reset link has been sent.
                </Alert>
            {:else if error}
                <Alert color="red" class="mb-6">
                    <span class="font-medium">Error!</span>
                    {error}
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
                            class="border-gray-200 pl-10 transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600"
                            disabled={isLoading}
                        />
                    </div>
                    {#if $errors.email}
                        <p class="text-sm text-red-600 dark:text-red-400">{$errors.email[0]}</p>
                    {/if}
                </div>

                <Button
                    type="submit"
                    class="w-full"
                    disabled={isLoading || !email}
                >
                    {#if isLoading}
                        <Spinner class="mr-3" size="4" color="secondary" />
                        Sending reset link...
                    {:else}
                        Send reset link
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
