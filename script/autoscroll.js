window.addEventListener('DOMContentLoaded', () => {
  const scrollBox = document.getElementById('autoScrollBox');
  let scrollInterval;

  if (scrollBox) {
    scrollInterval = setInterval(() => {
      const isAtBottom =
        Math.ceil(scrollBox.scrollTop + scrollBox.clientHeight) >= scrollBox.scrollHeight;

      if (!isAtBottom) {
        scrollBox.scrollTop += 1;
      }
    }, 30);
  }
});
