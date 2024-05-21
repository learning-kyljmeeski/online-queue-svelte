<script>
  export let text = "Button";
  export let onClick;
  export let type = "button";
  export let underline = false;

  function handleClick() {
    if (onClick) {
      onClick();
    }
  }
</script>

{#if type == "button"}
  <button class="button" on:click={handleClick}>{text}</button>
{:else if type == "link"}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={handleClick} style={underline ? "text-decoration: underline;" : ""}>{text}</a>
{/if}

<style>
  button {
    font-family: "Courier New", Courier, monospace;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  a {
    cursor: pointer;
    color: #000;
  }

  a:visited {
    color: #000;
  }
</style>
