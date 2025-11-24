// Drag + click behaviour for work(s) folders
document.addEventListener("DOMContentLoaded", () => {
  const desktopArea = document.querySelector(".desktop-area");
  const folders = document.querySelectorAll(".folder-icon");

  if (!desktopArea || !folders.length) return;

  let active = null;
  let offsetX = 0;
  let offsetY = 0;
  let startX = 0;
  let startY = 0;
  let hasMoved = false;

  folders.forEach(folder => {
    // Prevent any default drag ghost
    folder.addEventListener("dragstart", e => e.preventDefault());

    folder.addEventListener("mousedown", e => {
      active = folder;

      const rect = folder.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      folder.classList.add("dragging");
      folder.style.zIndex = 9999;

      e.preventDefault();
    });

    // Click to open, only if the user hasn't dragged
    folder.addEventListener("click", e => {
      if (hasMoved) {
        // If we dragged, don't treat it as a click-open
        hasMoved = false;
        return;
      }

      const link = folder.dataset.link;
      if (link) {
        window.location.href = link;
      }
    });
  });

  document.addEventListener("mousemove", e => {
    if (!active) return;

    const containerRect = desktopArea.getBoundingClientRect();

    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;

    // keep inside desktop area
    const maxX = containerRect.width - active.offsetWidth;
    const maxY = containerRect.height - active.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    active.style.left = x + "px";
    active.style.top = y + "px";

    // detect meaningful movement so a drag isn't treated as a click
    if (Math.abs(e.clientX - startX) > 4 || Math.abs(e.clientY - startY) > 4) {
      hasMoved = true;
    }
  });

  document.addEventListener("mouseup", () => {
    if (active) {
      active.classList.remove("dragging");
      active.style.zIndex = ""; // reset
    }
    active = null;
  });
});
