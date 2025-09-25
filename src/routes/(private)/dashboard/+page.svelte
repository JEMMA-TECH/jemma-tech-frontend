<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
</script>

<div class="container mx-auto p-6">
	<h1 class="text-3xl font-bold mb-6">Dashboard</h1>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<Card>
			<CardHeader>
				<CardTitle>Welcome to JEMMA</CardTitle>
				<CardDescription>Your Laundry Management System</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-muted-foreground">
					Start managing your laundry business efficiently with our comprehensive solution.
				</p>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Quick Stats</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-2">
					<div class="flex justify-between">
						<span class="text-sm">Active Orders:</span>
						<span class="text-sm font-medium">0</span>
					</div>
					<div class="flex justify-between">
						<span class="text-sm">Pending Collections:</span>
						<span class="text-sm font-medium">0</span>
					</div>
					<div class="flex justify-between">
						<span class="text-sm">Today's Revenue:</span>
						<span class="text-sm font-medium">$0</span>
					</div>
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Quick Actions</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="space-y-2">
					<p class="text-sm text-muted-foreground">Coming soon:</p>
					<ul class="text-sm space-y-1">
						<li>• Create new order</li>
						<li>• Manage customers</li>
						<li>• Track inventory</li>
						<li>• View reports</li>
					</ul>
				</div>
			</CardContent>
		</Card>
	</div>
</div>