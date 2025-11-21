
// DRAGGABLE STICKERS
document.addEventListener('DOMContentLoaded', function () {
  const stickers = document.querySelectorAll('.sticker');
  const page = document.querySelector('.page');

  if (!page || !stickers.length) return;

  let active = null;
  let offsetX = 0;
  let offsetY = 0;

  stickers.forEach(sticker => {
    sticker.addEventListener('mousedown', (e) => {
      active = sticker;
      const rect = sticker.getBoundingClientRect();
      const pageRect = page.getBoundingClientRect();

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      sticker.style.position = 'absolute';
      sticker.style.cursor = 'grabbing';
      sticker.style.zIndex = 999;

      e.preventDefault();
    });
  });

  document.addEventListener('mousemove', (e) => {
    if (!active) return;

    const pageRect = page.getBoundingClientRect();
    const x = e.clientX - offsetX - pageRect.left;
    const y = e.clientY - offsetY - pageRect.top;

    active.style.left = x + 'px';
    active.style.top = y + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (active) {
      active.style.cursor = 'grab';
    }
    active = null;
  });
});
