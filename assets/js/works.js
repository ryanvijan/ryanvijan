// assets/js/works.js

document.addEventListener("DOMContentLoaded", () => {
  const folders = document.querySelectorAll(".folder-icon");
  const desktop = document.querySelector(".desktop-area");
  if (!folders.length || !desktop) return;

  // --- RANDOM SPAWN OFFSETS ---
  folders.forEach(folder => {
    const style = window.getComputedStyle(folder);
    const baseTop = parseFloat(style.top) || 0;
    const baseLeft = parseFloat(style.left) || 0;
    const jitterX = (Math.random() - 0.5) * 80;
    const jitterY = (Math.random() - 0.5) * 60;
    folder.style.top = baseTop + jitterY + "px";
    folder.style.left = baseLeft + jitterX + "px";
  });

  let active = null;
  let offsetX = 0;
  let offsetY = 0;
  let startX = 0;
  let startY = 0;
  const dragThreshold = 10; // Threshold in pixels

  folders.forEach(folder => {
    folder.addEventListener("mousedown", e => {
      if (e.button !== 0) return;
      
      // Stop the browser from "ghosting" the image/text
      e.preventDefault(); 

      active = folder;
      startX = e.clientX;
      startY = e.clientY;

      const rect = folder.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      folder.classList.add("dragging");
    });
  });

  document.addEventListener("mousemove", e => {
    if (!active) return;

    const desktopRect = desktop.getBoundingClientRect();
    let x = e.clientX - desktopRect.left - offsetX;
    let y = e.clientY - desktopRect.top - offsetY;

    const maxX = desktopRect.width - active.offsetWidth;
    const maxY = desktopRect.height - active.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    active.style.left = x + "px";
    active.style.top = y + "px";
  });

  document.addEventListener("mouseup", e => {
    if (active) {
      // Calculate distance moved
      const distMoved = Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2));

      // If the movement was tiny, treat it as a click
      if (distMoved < dragThreshold) {
        const targetPage = active.getAttribute('id') + ".html";
        window.location.href = targetPage;
      }

      active.classList.remove("dragging");
      active = null;
    }
  });
});
