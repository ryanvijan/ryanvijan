// Draggable stickers using viewport (fixed) positioning
document.addEventListener("DOMContentLoaded", () => {
  const stickers = document.querySelectorAll(".sticker");
  if (!stickers.length) return;

  let active = null;
  let offsetX = 0;
  let offsetY = 0;

  stickers.forEach(sticker => {
    sticker.addEventListener("mousedown", (e) => {
      active = sticker;

      const rect = sticker.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      sticker.style.zIndex = 9999;
      e.preventDefault();
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (!active) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    active.style.left = x + "px";
    active.style.top = y + "px";
  });

  document.addEventListener("mouseup", () => {
    active = null;
  });
});
