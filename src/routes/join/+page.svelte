<script>
  import { onMount } from "svelte"; 
  import { goto } from "$app/navigation";

  import { getCookie } from "$lib/util/cookies.js";
  import { joinQueueQuery, logoutQuery } from "$lib/index.js";
  import { addToQueues } from "$lib/util/queues.js";
  import { ifPersonOnQueue } from "$lib/util/queues.js";

  import Container from "$components/layout/Container.svelte";
  import Header from "$components/layout/Header.svelte";

  import Title from "$components/Title.svelte";
  import Input from "$components/Input.svelte";
  import Button from "$components/Button.svelte";
  import Link from "$components/Link.svelte";

  let token;

  let queueCode;
  let personName;
  let isQueueCodeCorrect = true;
  let isPersonNameCorrect = true;
  let queueCodeErrorText = "what is the queue code?";
  let errorText = "what is your name?";

  onMount(() => {
    token = getCookie("online-queue-token");
  })

  async function joinQueue() {
    isQueueCodeCorrect = queueCode.length !== 0;
    isPersonNameCorrect = personName.length !== 0;
    if (!isQueueCodeCorrect || !isPersonNameCorrect) return;
    if (ifPersonOnQueue(queueCode)) {
      isQueueCodeCorrect = false;
      queueCodeErrorText = "you are already on this queue";
      return;
    }
    const response = await joinQueueQuery(queueCode, personName);
    if (response.success) {
      const queue = response.data;
      addToQueues(queue);
      goto(`/queues/${queueCode}`);
    } else {
      isPersonNameCorrect = false;
      errorText = response.message;
    }
  }
</script>

<Container>
  <div class="content">
    <Header>
      <Link to="/queues" text="my queues" />
    </Header>
    <Title>join the queue</Title>
    <Input
      bind:value={queueCode}
      errorText={queueCodeErrorText}
      correct={isQueueCodeCorrect}
      placeholder="queue code"
    />
    <Input
      bind:value={personName}
      {errorText}
      correct={isPersonNameCorrect}
      placeholder="your name"
    />
    <Button text="join" onClick={joinQueue} />
    <p>
      or <Link to="/create" text="create new queue" />
    </p>
    <div class="bottom">
      {#if token}
        <p>
          <Button text="log out" onClick={logoutQuery} type="link" underline />
        </p>
      {/if}
    </div>
  </div>
</Container>

<style>
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    gap: 10px;
  }
  p {
    display: flex;
    justify-content: center;
    text-align: center;
    gap: 10px;
  }
  .bottom {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
</style>
