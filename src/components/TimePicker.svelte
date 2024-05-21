<script>
  export let value = 0; // Значение времени в минутах
  export let hours = 0; // Количество часов по умолчанию
  export let minutes = 30; // Количество минут по умолчанию

  function handleChange() {
    value = hours * 60 + minutes; // Преобразуем часы и минуты в минуты
  }
</script>

<div class="time-picker">
  <input
    type="number"
    min="0"
    max="24"
    tabindex="-1"
    bind:value={hours}
    on:change={handleChange}
  />
  <span>:</span>
  <input
    type="number"
    min="0"
    max="59"
    tabindex="-1"
    bind:value={minutes}
    on:change={handleChange}
  />
</div>

<style>
  .time-picker {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  input {
    font-family: "Courier New", Courier, monospace;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    width: 50px;
    text-align: center;
  }
</style>
