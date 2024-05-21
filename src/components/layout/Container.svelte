<div class="container">
  <slot></slot>
</div>

<style>
  .container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    background-color: white;
    padding: 0 40px;
    gap: 20px;
  }
</style>
