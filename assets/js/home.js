// Draggable stickers using absolute positioning inside .page
document.addEventListener("DOMContentLoaded", () => {
  const stickers = document.querySelectorAll(".sticker");
  const container = document.querySelector(".page");
  if (!stickers.length || !container) return;

  let active = null;
  let offsetX = 0;
  let offsetY = 0;

  stickers.forEach((sticker) => {
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

    const containerRect = container.getBoundingClientRect();

    const x = e.clientX - containerRect.left - offsetX;
    const y = e.clientY - containerRect.top - offsetY;

    active.style.left = x + "px";
    active.style.top = y + "px";
    active.style.right = "auto";
  });

  document.addEventListener("mouseup", () => {
    active = null;
  });
});
