<script>
  export let value = "";
  export let placeholder = "";
  export let correct = true;
  export let errorText = "Input is incorrect";
  export let max = 100;
  export let type = "text";
  export let error = false;

  function handleInput(event) {
    value = event.target.value;
  }
</script>

{#if type == "text"}
  <input
    class="input"
    class:error
    type="text"
    bind:value
    {placeholder}
    on:input={handleInput}
    maxlength={max}
  />
{/if}
{#if type == "password"}
  <input
    class="input"
    class:error
    type="password"
    bind:value
    {placeholder}
    on:input={handleInput}
    maxlength={max}
  />
{/if}
{#if !correct}
  <span class="error-text">
    {errorText}
  </span>
{/if}

<style>
  .input {
    font-family: "Courier New", Courier, monospace;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
  }
  .error-text {
    margin: -10px 0;
    font-size: 14px;
    color: red;
  }
  .error {
    border-color: red;
  }
</style>
