document.addEventListener("DOMContentLoaded", () => {
  const stickers = document.querySelectorAll(".sticker");
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
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (!active) return;
    active.style.left = (e.clientX - offsetX) + "px";
    active.style.top = (e.clientY - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    active = null;
  });
});
