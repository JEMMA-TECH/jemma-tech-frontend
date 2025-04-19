<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";


let formData = {
    email: "",
    password: "",
  };



  
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
    <div class="w-full max-w-md">
      <Card.Root class="rounded-xl bg-white shadow-md">
        <Card.Content class="p-4 text-center"> 
            <h2 class="text-xl font-bold text-gray-800">Welcome Back</h2>
        </Card.Content>
       
        <div class="max-h-screen">
        <Card.Content class="p-4 space-y-1 flex-grow overflow-y-auto">
            <div class="grid gap-4">
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="abc@gmail.com" bind:value={formData.email}/>
              </div>

              <div>
                <Label>Password</Label>
                <Input type="password" placeholder="Password" bind:value={formData.password}/>
                <!-- {#if errors.company_email}<p class="text-red-500 text-xs mt-1">{errors.company_email}</p>{/if} -->
              </div>
            </div>
        </Card.Content>

        <Card.Footer class="flex justify-between p-4 pt-2 border-t">
          
            <Button 
            disabled={formData.email.length < 2 || formData.password.length < 6}
             class="flex-grow w-1/2 bg-[#001f3f] hover:bg-[#001737]">
              Login
            </Button> 
        </Card.Footer>
      </Card.Root>
    </div>
</div>