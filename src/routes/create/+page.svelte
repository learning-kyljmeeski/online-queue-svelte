<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  import { createQueueQuery, logoutQuery } from "$lib/index.js";
  import { getCookie } from "$lib/util/cookies.js";
  import { addToOwnedQueues } from "$lib/util/queues.js";

  import Container from "$components/layout/Container.svelte";
  import Header from "$components/layout/Header.svelte";

  import Title from "$components/Title.svelte";
  import Input from "$components/Input.svelte";
  import TimePicker from "$components/TimePicker.svelte";
  import Button from "$components/Button.svelte";
  import Link from "$components/Link.svelte";

  let queueName = "";
  let isQueueNameCorrect = true;
  let selectedTime = 30;
  let token;

  onMount(() => {
    token = getCookie("online-queue-token");
    if (!token) {
      goto("/login");
    }
  });

  async function createQueue() {
    if (queueName.length === 0) {
      isQueueNameCorrect = false;
      return;
    }
    const queue = {
      name: queueName,
      duration: selectedTime,
    };
    const queueCode = await createQueueQuery(queue);
    addToOwnedQueues(Number(queueCode));
  }
</script>

<Container>
  <div class="content">
    <Header>
      <Link to="/queues" text="my queues" />
    </Header>
    <Title>new queue</Title>
    <Input
      bind:value={queueName}
      errorText={"give the it a name"}
      correct={isQueueNameCorrect}
      placeholder="name"
      max="18"
    />
    <div class="row">
      <TimePicker bind:value={selectedTime} />
      <Button text="create" onClick={createQueue} />
    </div>
    <p>
      or <Link to="/join" text="join the queue" />
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
  .row {
    display: flex;
    gap: 10px;
  }
  p {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .bottom {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
</style>
