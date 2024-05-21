<script>
  export let toCopy;
  export let text = "copy";

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Текст скопирован в буфер обмена: ", text);
        // Добавьте здесь обратную связь для пользователя, например, всплывающее окно или уведомление
      })
      .catch((err) => {
        console.error("Ошибка копирования текста: ", err);
        // Добавьте здесь обработку ошибок, например, уведомление об ошибке
      });
  }
</script>

<button
  on:click={() => copyToClipboard(toCopy)}
  class="copy-button">{text}</button
>

<style>
  button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
  }
</style>
