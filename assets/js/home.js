// Popup shows after 30 seconds
setTimeout(() => {
  const ad = document.getElementById("popup-ad");
  if (ad) {
    ad.classList.remove("hidden");
    setTimeout(() => ad.classList.add("show"), 50);
  }
}, 30000);

// Close button functionality
document.querySelector(".popup-close")?.addEventListener("click", () => {
  const ad = document.getElementById("popup-ad");
  if (!ad) return;
  ad.classList.remove("show");
  setTimeout(() => ad.classList.add("hidden"), 350);
});
document.addEventListener("DOMContentLoaded", function () {
  const stickers = document.querySelectorAll(".draggable-sticker");

  // Give each sticker a random starting spot in the right side of the screen
  function placeStickers() {
    stickers.forEach(sticker => {
      const padding = 40;
      const rightStart = window.innerWidth * 0.6;     // 60% from left = right zone
      const rightEnd   = window.innerWidth * 0.95;    // leave a bit of margin

      const left = Math.min(
        rightEnd - sticker.offsetWidth - padding,
        rightStart + Math.random() * (rightEnd - rightStart - sticker.offsetWidth)
      );

      const topMin = 160;                             // below the menu bar
      const topMax = window.innerHeight - sticker.offsetHeight - padding;
      const top = topMin + Math.random() * Math.max(40, topMax - topMin);

      sticker.style.left = left + "px";
      sticker.style.top = top + "px";
    });
  }

  placeStickers();
  window.addEventListener("resize", placeStickers);

  // Drag logic
  let current = null;
  let offsetX = 0;
  let offsetY = 0;

  function onMouseDown(e) {
    current = e.target;
    const rect = current.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    current.style.cursor = "grabbing";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(e) {
    if (!current) return;
    current.style.left = e.clientX - offsetX + "px";
    current.style.top = e.clientY - offsetY + "px";
  }

  function onMouseUp() {
    if (!current) return;
    current.style.cursor = "grab";
    current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  stickers.forEach(sticker => {
    sticker.addEventListener("mousedown", onMouseDown);
  });
});
