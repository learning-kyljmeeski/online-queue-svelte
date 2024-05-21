<script>
  import { onMount } from "svelte";
  import { getQueuesQuery } from "$lib/index.js";
  import { getCookie } from "$lib/util/cookies.js";
  import { getQueues } from "$lib/util/queues.js";

  import Container from "$components/layout/Container.svelte";
  import Header from "$components/layout/Header.svelte";

  import Title from "$components/Title.svelte";
  import Link from "$components/Link.svelte";
  import Button from "$components/Button.svelte";

  let queues = [];
  let queuesAsQueuer = [];
  let isLoggedIn = false;
  let activeQueuesTab = "as-queuer";

  onMount(async () => {
    queuesAsQueuer = getQueues();
    console.log(queuesAsQueuer);
    const token = getCookie("online-queue-token");
    if (token) {
      const response = await getQueuesQuery(token);
      isLoggedIn = true;
      activeQueuesTab = "as-owner";
      if (response.success) {
        queues = response.queues;
      } else {
        console.log(response);
      }
    }
  });

  function changeTab() {
    if (activeQueuesTab == "as-queuer") {
      activeQueuesTab = "as-owner";
    } else if (activeQueuesTab == "as-owner") {
      activeQueuesTab = "as-queuer";
    }
  }
</script>

<Container>
  <div class="content">
    <Header>
      <div class="top">
        <Title>my queues</Title>
        <p>
          <Link to="/" text="back" />
          {#if isLoggedIn}
            <Button
              text={activeQueuesTab == "as-queuer"
                ? "queues i own"
                : "queues i'm on"}
              onClick={changeTab}
              type="link"
            />
          {/if}
        </p>
        <hr />
      </div>
    </Header>
    <div class="mid">
      {#if isLoggedIn}
        {#if activeQueuesTab == "as-owner"}
          <div class="queues as-owner">
            {#each queues as queue}
              <p>
                <Link
                  to={`/queues/${queue.id}`}
                  text={`${queue.name} : ${queue.length === 0 ? "no one is " : queue.length === 1 ? "1 is " : queue.length + " are "} waiting`}
                />
              </p>
            {/each}
          </div>
        {:else if activeQueuesTab == "as-queuer"}
          <div class="queues as-queuer">
            {#each queuesAsQueuer as queue}
              <p>
                <Link
                  to={`/queues/${queue.queueId}`}
                  text={`${queue.queueName} : ${queue.queueLength === 0 ? "no one is " : queue.queueLength === 1 ? "1 is " : queue.queueLength + " are "} waiting`}
                />
              </p>
            {/each}
          </div>
        {/if}
      {:else}
        <div class="queues as-queuer">
          {#each queuesAsQueuer as queue}
            <p>
              <Link
                to={`/queues/${queue.queueId}`}
                text={`${queue.queueName} : ${queue.queueLength === 0 ? "no one is " : queue.queueLength === 1 ? "1 is " : queue.queueLength + " are "} waiting`}
              />
            </p>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</Container>

<style>
  .content {
    position: relative;
    display: flex;
    height: 100%;
  }
  .top {
    display: flex;
    max-width: 300px;
    width: 100%;
    flex-direction: column;
    gap: 10px;
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
  .queues {
    height: calc(100vh - 150px);
    display: flex;
    flex-direction: column;
    gap: 25px;
    overflow: auto;
    width: 100%;
  }
</style>
