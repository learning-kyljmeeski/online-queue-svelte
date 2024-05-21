<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getCookie } from "$lib/util/cookies.js";

  onMount(async () => {
    const hasToken = checkForToken();
    const redirectPath = hasToken ? "/create" : "/join";
    if (typeof window !== "undefined") {
      await goto(redirectPath);
    }
  });

  function checkForToken() {
    const token = getCookie("online-queue-token");

    if (token && token.length > 0 && token.split(".").length === 3) {
      return true;
    } else {
      return false;
    }
  }
</script>

<svelte:head>
  <title>Перенаправление...</title>
</svelte:head>
