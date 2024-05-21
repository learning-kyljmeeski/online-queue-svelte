<script>
  import { onMount } from "svelte";
  import { getQueueQuery, callNextQuery, joinQueueQuery } from "$lib/index.js";
  import { getCookie } from "$lib/util/cookies.js";
  import { getPersonNameFromQueue, ifPersonOnQueue } from "$lib/util/queues.js";
  import { addToQueues, doesUserOwnQueue } from "$lib/util/queues.js";

  import Container from "$components/layout/Container.svelte";

  import Header from "$components/layout/Header.svelte";
  import Title from "$components/Title.svelte";
  import Input from "$components/Input.svelte";
  import Button from "$components/Button.svelte";
  import ClickToCopy from "$components/ClickToCopy.svelte";
  import Link from "$components/Link.svelte";

  export let data;

  let code;
  let name = "";
  let people = [];
  let token;

  let userType = "queuer";
  let personName;
  let isPersonOnQueue;

  let isPersonNameCorrect = true;

  onMount(async () => {
    code = data.code;
    token = getCookie("online-queue-token");
    if (token) {
      userType = "owner";
    }
    personName = getPersonNameFromQueue(code) || "";
    isPersonOnQueue = ifPersonOnQueue(code);
    const response = await getQueueQuery(token, data.code);
    if (response.success) {
      name = response.data.name;
      people = response.data.people;
    } else if (response.status !== 404) {
      console.error(response.status);
    }
  });

  async function callNext() {
    const response = await callNextQuery(token, data.code);
    if (response.success) {
      people = response.people;
    } else {
      console.log(response.message);
    }
  }

  async function joinQueue() {
    isPersonNameCorrect = personName.length !== 0;
    if (!isPersonNameCorrect) return;
    const response = await joinQueueQuery(code, personName);
    if (response.success) {
      const queue = response.data;
      addToQueues(queue);
      isPersonOnQueue = true;
    } else {
      isPersonNameCorrect = false;
    }
  }
</script>

<Container>
  <div class="content">
    <Header>
      <div class="top">
        <Title>{name}</Title>
        <p>
          <Link to="/queues" text="back" />
          <ClickToCopy toCopy={code} text="copy code" />
        </p>
        <hr />
      </div>
    </Header>
    <div class="mid">
      <div class="people">
        {#if people.length !== 0}
          {#each people as person, index}
            <div class="person" class:person--active={personName == person}>
              {index + 1} : {person}
            </div>
          {/each}
        {:else}
          <div>no people on this queue</div>
        {/if}
      </div>
    </div>
    {#if userType == "owner" && doesUserOwnQueue(code)}
      <Button text="call next" onClick={callNext} />
    {:else if !isPersonOnQueue}
      <div class="row">
        <Input
          bind:value={personName}
          error={!isPersonNameCorrect}
          placeholder="your name"
        />
        <Button text="join" onClick={joinQueue} />
      </div>
    {/if}
  </div>
</Container>

<style>
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;

    justify-content: space-between;
    padding-bottom: 25px;
  }
  .top {
    display: flex;
    max-width: 300px;
    width: 100%;
    flex-direction: column;
    gap: 10px;
    height: calc(100% - 100px);
  }
  p {
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .mid {
    padding-top: 125px;
  }
  .people {
    height: calc(100vh - 172px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
    width: 100%;
  }
  .person {
    padding: 5px;
  }
  .person--active {
    border: solid 1px #007bff;
  }
  .row {
    display: flex;
    gap: 10px;
  }
</style>
