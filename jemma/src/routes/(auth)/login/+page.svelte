<script>
    import { Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';

    import { createForm } from 'felte';
  
    const { form } = createForm();

    let email = '';
    let password = '';

  </script>
  
<div class="flex justify-center items-center min-h-screen">
    <Card>
        <form use:form class="flex flex-col space-y-6" action="/">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <Label class="space-y-2">
                <span>Email</span>
                <Input 
                    type="email" 
                    name="email" 
                    placeholder="name@company.com" 
                    bind:value={email} 
                    required 
                    class="focus:ring-teal-500 focus:border-teal-500"
                />
            </Label>
            <Label class="space-y-2">
                <span>Password</span>
                <Input 
                    type="password" 
                    name="password" 
                    placeholder="••••••••" 
                    bind:value={password} 
                    required 
                    class="focus:ring-teal-500 focus:border-teal-500"
                />
            </Label>
            <div class="flex items-start">
                <Checkbox color="teal">Remember me</Checkbox>
                <a href="/" class="ms-auto text-sm text-teal-700 hover:underline dark:text-teal-500"> Forgot password? </a>
            </div>
            <Button type="submit" class="w-full bg-teal-700 hover:bg-teal-800 disabled:bg-teal-800"
             disabled={!email || !password}>Login to your account
            </Button>
            
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered? <a href="/register" class="text-teal-700 hover:underline dark:text-teal-500"> Create account </a>
            </div>
        </form>
    </Card>
</div>
