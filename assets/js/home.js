document.addEventListener("DOMContentLoaded", () => {
  const stickers = document.querySelectorAll(".sticker");
  const layer = document.querySelector(".sticker-layer");

  if (!layer || !stickers.length) return;

  let active = null;
  let offsetX = 0;
  let offsetY = 0;

  stickers.forEach(sticker => {
    sticker.addEventListener("mousedown", (e) => {
      active = sticker;

      const rect = sticker.getBoundingClientRect();
      const layerRect = layer.getBoundingClientRect();

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      sticker.style.zIndex = 9999;
      e.preventDefault();
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (!active) return;

    const layerRect = layer.getBoundingClientRect();

    let x = e.clientX - offsetX - layerRect.left;
    let y = e.clientY - offsetY - layerRect.top;

    const maxX = layerRect.width - active.offsetWidth;
    const maxY = layerRect.height - active.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    active.style.left = x + "px";
    active.style.top = y + "px";
  });

  document.addEventListener("mouseup", () => {
    active = null;
  });
});
