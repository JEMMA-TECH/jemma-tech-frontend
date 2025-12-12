<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";

	let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
	theme={mode.current}
	class="toaster group"
	position="top-right"
	toastOptions={{
		duration: 3000,
		classes: {
			toast: 'group toast group-[.toaster]:bg-white dark:group-[.toaster]:bg-gray-800 group-[.toaster]:text-gray-900 dark:group-[.toaster]:text-gray-100 group-[.toaster]:border group-[.toaster]:border-gray-200 dark:group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg',
			description: 'group-[.toast]:text-gray-600 dark:group-[.toast]:text-gray-400',
			actionButton: 'group-[.toast]:bg-teal-600 group-[.toast]:text-white hover:group-[.toast]:bg-teal-700',
			cancelButton: 'group-[.toast]:bg-gray-100 dark:group-[.toast]:bg-gray-700 group-[.toast]:text-gray-700 dark:group-[.toast]:text-gray-300',
			success: 'group-[.toaster]:!bg-green-50 dark:group-[.toaster]:!bg-green-950 group-[.toaster]:!text-green-900 dark:group-[.toaster]:!text-green-100 group-[.toaster]:!border-green-200 dark:group-[.toaster]:!border-green-800',
			error: 'group-[.toaster]:!bg-red-50 dark:group-[.toaster]:!bg-red-950 group-[.toaster]:!text-red-900 dark:group-[.toaster]:!text-red-100 group-[.toaster]:!border-red-200 dark:group-[.toaster]:!border-red-800',
			warning: 'group-[.toaster]:!bg-orange-50 dark:group-[.toaster]:!bg-orange-950 group-[.toaster]:!text-orange-900 dark:group-[.toaster]:!text-orange-100 group-[.toaster]:!border-orange-200 dark:group-[.toaster]:!border-orange-800',
			info: 'group-[.toaster]:!bg-blue-50 dark:group-[.toaster]:!bg-blue-950 group-[.toaster]:!text-blue-900 dark:group-[.toaster]:!text-blue-100 group-[.toaster]:!border-blue-200 dark:group-[.toaster]:!border-blue-800'
		}
	}}
	{...restProps}
/>
