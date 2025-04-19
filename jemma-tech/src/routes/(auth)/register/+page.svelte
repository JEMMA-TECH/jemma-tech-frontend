<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { CheckCircle } from "lucide-svelte";

  let step = 1;
  const steps = ["Company Info", "User Info", "Review"];

  let formData = {
    name: "",
    address: "",
    company_email: "",
    phone: "",
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    password: "",
    confirm_password: ""
  };

  let errors = {
    name: "",
    company_email: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  let submitted = false;

  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateStep(stepNumber: number): boolean {
    let isValid = true;

    if (stepNumber === 1) {
      errors = { ...errors, name: "", company_email: "" };

      if (!formData.name.trim()) {
        errors.name = "Company name is required";
        isValid = false;
      }

      if (!formData.company_email.trim()) {
        errors.company_email = "Company email is required";
        isValid = false;
      } else if (!validateEmail(formData.company_email)) {
        errors.company_email = "Please enter a valid email";
        isValid = false;
      }
    }

    if (stepNumber === 2) {
      errors = { ...errors, email: "", password: "", confirm_password: "" };

      if (!formData.email.trim()) {
        errors.email = "User email is required";
        isValid = false;
      } else if (!validateEmail(formData.email)) {
        errors.email = "Please enter a valid email";
        isValid = false;
      }

      if (!formData.password.trim()) {
        errors.password = "Password is required";
        isValid = false;
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
        isValid = false;
      }

      if (formData.password !== formData.confirm_password) {
        errors.confirm_password = "Passwords do not match";
        isValid = false;
      }
    }

    return isValid;
  }

  function validateAllSteps(): boolean {
    return validateStep(1) && validateStep(2);
  }

  function nextStep() {
    if (validateStep(step) && step < steps.length) {
      step++;
    }
  }

  function prevStep() {
    if (step > 1) step--;
  }

  function handleSubmit() {
    if (validateAllSteps()) {
      console.log("Form submitted:", formData);
      submitted = true;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
  {#if submitted}
    <div class="w-full max-w-md">
      <Card.Root class="rounded-xl bg-white shadow-md">
        <Card.Content class="p-6 text-center">
          <div class="flex justify-center mb-4">
            <CheckCircle class="w-12 h-12 text-[#003366]" />
          </div>
          <h2 class="text-xl font-bold text-[#001f3f] mb-2">Registration Complete!</h2>
          <p class="text-sm text-gray-600 mb-4">Thank you for registering {formData.name}.</p>
          <p class="text-xs text-gray-500">A confirmation has been sent to {formData.email}.</p>
        </Card.Content>
      </Card.Root>
    </div>
  {:else}
    <div class="w-full max-w-md">
      <!-- Stepper -->
      <div class="flex justify-between mb-6 relative">
        <div class="absolute top-[14px] left-0 right-0 mx-auto w-[calc(100%-60px)] border-t border-gray-200"></div>
        {#each steps as label, i}
          <div class="flex-1 flex flex-col items-center relative z-10">
            <div class={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all text-sm
              ${i + 1 === step ? 'bg-[#001f3f] text-white border-2 border-[#001f3f]' :
               i + 1 < step ? 'bg-[#e6ecf2] text-[#001f3f] border-2 border-[#003366]' :
               'bg-gray-100 text-gray-500 border-2 border-gray-300'}`}>
              {#if i + 1 < step}
                <CheckCircle class="w-4 h-4" />
              {:else}
                {i + 1}
              {/if}
            </div>
            <div class={`text-xs mt-1 text-center ${i + 1 <= step ? 'text-[#001f3f] font-medium' : 'text-gray-500'}`}>
              {label}
            </div>
          </div>
        {/each}
      </div>

      <!-- Form Card -->
      <Card.Root class="rounded-lg bg-white shadow-md overflow-hidden min-h-[500px] flex flex-col">
        <Card.Header class="border-b px-6 py-3">
          <h2 class="text-lg font-semibold text-[#001f3f]">
            {#if step === 1}
              Company Information
            {:else if step === 2}
              User Information
            {:else}
              Review Details
            {/if}
          </h2>
          <p class="text-xs text-gray-500">Step {step} of {steps.length}</p>
        </Card.Header>

        <Card.Content class="p-6 space-y-4 flex-grow overflow-y-auto">
          {#if step === 1}
            <div class="grid gap-4">
              <div>
                <Label>Company Name *</Label>
                <Input type="text" placeholder="Dover Clean" bind:value={formData.name}/>
                {#if errors.name}<p class="text-red-500 text-xs mt-1">{errors.name}</p>{/if}
              </div>

              <div>
                <Label>Company Email *</Label>
                <Input type="email" placeholder="e.g. abc@gmail.com" bind:value={formData.company_email}/>
                {#if errors.company_email}<p class="text-red-500 text-xs mt-1">{errors.company_email}</p>{/if}
              </div>

              <div>
                <Label>Company Phone</Label>
                <Input type="tel" placeholder="Enter company phone number" bind:value={formData.phone}/>
              </div>

              <div>
                <Label>Company Address</Label>
                <Input type="text" placeholder="Enter company address" bind:value={formData.address}/>
              </div>
            </div>
          {/if}

          {#if step === 2}
            <div class="grid gap-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input type="text" placeholder="Jane" bind:value={formData.first_name}/>
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input type="text" placeholder="Doe" bind:value={formData.last_name}/>
                </div>
              </div>

              <div>
                <Label>Email *</Label>
                <Input type="email" placeholder="abc@gmail.com" bind:value={formData.email}/>
                {#if errors.email}<p class="text-red-500 text-xs mt-1">{errors.email}</p>{/if}
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input type="tel" placeholder="Enter your phone number" bind:value={formData.contact}/>
              </div>

              <div>
                <Label>Password *</Label>
                <Input type="password" placeholder="Password" bind:value={formData.password}/>
                {#if errors.password}<p class="text-red-500 text-xs mt-1">{errors.password}</p>{/if}
              </div>

              <div>
                <Label>Confirm Password *</Label>
                <Input type="password" placeholder="Confirm Password" bind:value={formData.confirm_password}/>
                {#if errors.confirm_password}<p class="text-red-500 text-xs mt-1">{errors.confirm_password}</p>{/if}
              </div>
            </div>
          {/if}

          {#if step === 3}
            <div class="space-y-6">
              <div>
                <h4 class="font-medium text-[#001f3f] mb-2 flex items-center justify-between">
                  Company Details
                  <button 
                    class="text-sm text-[#001f3f] hover:underline" 
                    on:click={() => step = 1}
                  >
                    Edit
                  </button>
                </h4>
                <div class="space-y-2 text-sm">
                  <p><span class="text-gray-500">Name:</span> {formData.name}</p>
                  <p><span class="text-gray-500">Email:</span> {formData.company_email}</p>
                  <p><span class="text-gray-500">Phone:</span> {formData.phone || "Not provided"}</p>
                  <p><span class="text-gray-500">Address:</span> {formData.address || "Not provided"}</p>
                </div>
              </div>
              <div>
                <h4 class="font-medium text-[#001f3f] mb-2 flex items-center justify-between">
                  User Details
                  <button 
                    class="text-sm text-[#001f3f] hover:underline" 
                    on:click={() => step = 2}
                  >
                    Edit
                  </button>
                </h4>
                <div class="space-y-2 text-sm">
                  <p><span class="text-gray-500">Name:</span> {formData.first_name} {formData.last_name}</p>
                  <p><span class="text-gray-500">Email:</span> {formData.email}</p>
                  <p><span class="text-gray-500">Phone:</span> {formData.contact || "Not provided"}</p>
                </div>
              </div>
            </div>
          {/if}
        </Card.Content>

        <Card.Footer class="flex justify-between p-3 pt-2 border-t">
          <Button 
            variant="outline" 
            on:click={prevStep}
            disabled={step === 1}
            class={step === 1 ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Previous
          </Button>

          {#if step < steps.length}
            <Button on:click={nextStep} class="bg-[#032f3c] hover:bg-[#001737] text-white">
              Continue
            </Button>
          {:else}
            <Button on:click={handleSubmit} class="bg-[#001f3f] hover:bg-[#001737] text-white">
              Submit Registration
            </Button>
          {/if}
        </Card.Footer>
      </Card.Root>
    </div>
  {/if}
</div>