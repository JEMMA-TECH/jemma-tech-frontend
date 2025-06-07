<script>
    import { Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';

    import { createForm } from 'felte';
  
    const { form, data: formData } = createForm();
    let step = 1;

  </script>

<div class="flex justify-center items-center min-h-screen">
    <Card class="max-w-lg w-full shadow-lg rounded-lg p-6 bg-white dark:bg-gray-800">
        <form use:form class="flex flex-col space-y-6" action="/">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white text-center">Register</h3>
            
            {#if step === 1}
                <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Step 1: Company Details</h4>
                    <Label class="space-y-2">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</span>
                        <div class="mt-1">
                            <Input 
                                type="text" 
                                name="companyName" 
                                placeholder="Your Company Name" 
                                required 
                                class="focus:ring-teal-500 focus:border-teal-500 rounded-md"
                            />
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
                                class="focus:ring-teal-500 focus:border-teal-500 rounded-md"
                            />
                        </div>
                    </Label>
                    <Label class="space-y-2">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Company Address</span>
                        <div class="mt-1">
                            <Input 
                                type="text" 
                                name="address" 
                                placeholder="Enter your Company Address" 
                                required 
                                class="focus:ring-teal-500 focus:border-teal-500 rounded-md"
                            />
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
                                class="focus:ring-teal-500 focus:border-teal-500 rounded-md"
                            />
                        </div>
                    </Label>
                </div>
            {/if}

            {#if step === 2}
                <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Step 2: User Details</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <Label class="space-y-2">
                            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</span>
                            <div class="mt-1">
                                <Input 
                                    type="text" 
                                    name="first_name" 
                                    placeholder="John" 
                                    required 
                                    class="focus:ring-teal-500 focus:border-teal-500 rounded-md"
                                />
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
                                    class="focus:ring-teal-500 focus:border-teal-500 rounded-md"
                                />
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
                                class="focus:ring-teal-500 focus:border-teal-500 rounded-md"
                            />
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
                                class="focus:ring-teal-500 focus:border-teal-500 rounded-md"
                            />
                        </div>
                    </Label>
                    <Label class="space-y-2">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</span>
                        <div class="mt-1">
                            <Input 
                                type="password" 
                                name="confirm_password" 
                                placeholder="••••••••" 
                                required 
                                class="focus:ring-teal-500 focus:border-teal-500 rounded-md"
                            />
                        </div>
                    </Label>
                </div>
            {/if}

            {#if step === 3}
                <div>
                    <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Step 3: Review Details</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">Please review your details before submitting:</p>
                    <ul class="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        <li>
                            <strong>Company Name:</strong> {formData.companyName}
                            <button type="button" on:click={() => step = 1} class="ml-2 text-teal-600 hover:underline">Edit</button>
                        </li>
                        <li>
                            <strong>Company Email:</strong> {formData.company_email}
                            <button type="button" on:click={() => step = 1} class="ml-2 text-teal-600 hover:underline">Edit</button>
                        </li>
                        <li>
                            <strong>Company Address:</strong> {formData.address}
                            <button type="button" on:click={() => step = 1} class="ml-2 text-teal-600 hover:underline">Edit</button>
                        </li>
                        <li>
                            <strong>Company Phone:</strong> {formData.phone}
                            <button type="button" on:click={() => step = 1} class="ml-2 text-teal-600 hover:underline">Edit</button>
                        </li>
                        <li>
                            <strong>First Name:</strong> {formData.first_name}
                            <button type="button" on:click={() => step = 2} class="ml-2 text-teal-600 hover:underline">Edit</button>
                        </li>
                        <li>
                            <strong>Last Name:</strong> {formData.last_name}
                            <button type="button" on:click={() => step = 2} class="ml-2 text-teal-600 hover:underline">Edit</button>
                        </li>
                        <li>
                            <strong>Email:</strong> {formData.email}
                            <button type="button" on:click={() => step = 2} class="ml-2 text-teal-600 hover:underline">Edit</button>
                        </li>
                    </ul>
                </div>
            {/if}

            <div class="flex justify-between items-center mt-6">
                <Button type="button" disabled={step === 1} on:click={() => step--} class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Back</Button>
                {#if step < 3}
                    <Button type="button" on:click={() => step++} class="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-md">Next</Button>
                {/if}
                {#if step === 3}
                    <Button type="submit" class="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-md">Submit</Button>
                {/if}
            </div>
        </form>
    </Card>
</div>
