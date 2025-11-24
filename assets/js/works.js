// assets/js/works.js

document.addEventListener("DOMContentLoaded", () => {
  const folders = document.querySelectorAll(".folder-icon");
  const desktop = document.querySelector(".desktop-area");
  if (!folders.length || !desktop) return;

  // --- RANDOM SPAWN OFFSETS ON EACH LOAD ---
  folders.forEach(folder => {
    const style = window.getComputedStyle(folder);

    // base positions from CSS (in px after computed)
    const baseTop = parseFloat(style.top) || 0;
    const baseLeft = parseFloat(style.left) || 0;

    // jitter ranges (tweak these if you want more/less chaos)
    const jitterX = (Math.random() - 0.5) * 80;  // -40px .. +40px
    const jitterY = (Math.random() - 0.5) * 60;  // -30px .. +30px

    folder.style.top = baseTop + jitterY + "px";
    folder.style.left = baseLeft + jitterX + "px";
  });

  // --- DRAGGING LOGIC ---
  let active = null;
  let offsetX = 0;
  let offsetY = 0;

  folders.forEach(folder => {
    folder.addEventListener("mousedown", e => {
      // left-click only
      if (e.button !== 0) return;

      active = folder;

      const rect = folder.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      folder.classList.add("dragging");
      e.preventDefault();
    });

    folder.addEventListener("mouseup", () => {
      folder.classList.remove("dragging");
    });
  });

  document.addEventListener("mousemove", e => {
    if (!active) return;

    const desktopRect = desktop.getBoundingClientRect();

    let x = e.clientX - desktopRect.left - offsetX;
    let y = e.clientY - desktopRect.top - offsetY;

    // keep folders inside the desktop area
    const maxX = desktopRect.width - active.offsetWidth;
    const maxY = desktopRect.height - active.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    active.style.left = x + "px";
    active.style.top = y + "px";
  });

  document.addEventListener("mouseup", () => {
    if (active) {
      active.classList.remove("dragging");
      active = null;
    }
  });
});
