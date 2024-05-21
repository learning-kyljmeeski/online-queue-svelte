<script>
  import { loginQuery } from "$lib/index.js";

  import Container from "$components/layout/Container.svelte";

  import Title from "$components/Title.svelte";
  import Input from "$components/Input.svelte";
  import Button from "$components/Button.svelte";
  import Link from "$components/Link.svelte";

  let username = "";
  let password = "";
  let isUsernameEmpty = false;
  let isPasswordEmpty = false;
  let areCredentialsCorrect = true;

  async function login() {
    if (username.length == 0) {
      isUsernameEmpty = true;
      return;
    } else {
      isUsernameEmpty = false;
    }
    if (password.length == 0) {
      isPasswordEmpty = true;
      return;
    } else {
      isPasswordEmpty = false;
    }
    const response = await loginQuery({ username, password });
    if (
      (!response.success && response.status === 403) ||
      response.status == 400
    ) {
      areCredentialsCorrect = false;
    }
  }
</script>

<Container>
  <div class="content">
    <Title>login</Title>
    <Input
      bind:value={username}
      errorText={"type something"}
      error={!areCredentialsCorrect}
      correct={!isUsernameEmpty}
      placeholder="username"
    />
    <Input
      bind:value={password}
      type="password"
      errorText={"empty password? really?"}
      error={!areCredentialsCorrect}
      correct={!isPasswordEmpty}
      placeholder="password"
    />
    <Button text="log in" onClick={login} />
    <p>
      or <Link to="/signup" text="sign up" />
    </p>
    <div class="bottom">
      <p><Link to="/join" text="join the queue" /></p>
    </div>
  </div>
</Container>

<style>
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    height: 100%;
  }
  p {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
