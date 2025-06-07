<script>
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { Button } from 'flowbite-svelte';
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
	<div
		class="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-none dark:border-gray-700 dark:bg-gray-800"
	>
		<div class="text-center">
			<h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
				Oops, Something Went Wrong!
			</h1>
			<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
				{#if page.error?.message}
					{page.error.message}
				{:else}
					An unexpected error occurred. Please try again later.
				{/if}
			</p>
			<div class="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
				<Button onclick={() => window.history.back()}>Go Back</Button>
				<Button onclick={() => goto('/')} color="alternative">Return to Dashboard</Button>
			</div>
		</div>
	</div>
</div>

