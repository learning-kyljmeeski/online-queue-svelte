<script>
  import { signupQuery } from "$lib/index.js";
  import {
    checkUsernameForCorrectness,
    checkPasswordForCorrectness,
  } from "$lib/util/checkers.js";

  import Container from "$components/layout/Container.svelte";

  import Title from "$components/Title.svelte";
  import Input from "$components/Input.svelte";
  import Button from "$components/Button.svelte";
  import Link from "$components/Link.svelte";

  let username = "";
  let password = "";
  let isUsernameCorrect = true;
  let isPasswordCorrect = true;
  let usernameErrorText = "username is not correct";
  let passwordErrorText = "password is not correct";

  async function signup() {
    isUsernameCorrect = checkUsernameForCorrectness(username).isUsernameCorrect;
    if (!isUsernameCorrect) {
      usernameErrorText =
        checkUsernameForCorrectness(username).usernameErrorText;
      return;
    }

    isPasswordCorrect = checkPasswordForCorrectness(password).isPasswordCorrect;
    if (!isPasswordCorrect) {
      passwordErrorText =
        checkPasswordForCorrectness(password).passwordErrorText;
      return;
    }

    const response = await signupQuery({ username, password });
    if (!response.success && response.status == 409) {
      isUsernameCorrect = false;
      usernameErrorText = "username is taken";
      return;
    }
  }
</script>

<Container>
  <div class="content">
    <Title>registration</Title>
    <Input
      bind:value={username}
      errorText={usernameErrorText}
      correct={isUsernameCorrect}
      placeholder="username"
    />
    <Input
      bind:value={password}
      errorText={passwordErrorText}
      correct={isPasswordCorrect}
      placeholder="password"
      type="password"
    />
    <Button text="sign up" onClick={signup} />
    <p>or <Link to="/login" text="log in" /></p>
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
