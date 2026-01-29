// assets/js/works.js

document.addEventListener("DOMContentLoaded", () => {
  const folders = document.querySelectorAll(".folder-icon");
  const desktop = document.querySelector(".desktop-area");
  if (!folders.length || !desktop) return;

  // --- RANDOM SPAWN OFFSETS ON EACH LOAD ---
  folders.forEach(folder => {
    const style = window.getComputedStyle(folder);
    const baseTop = parseFloat(style.top) || 0;
    const baseLeft = parseFloat(style.left) || 0;

    const jitterX = (Math.random() - 0.5) * 80;
    const jitterY = (Math.random() - 0.5) * 60;

    folder.style.top = baseTop + jitterY + "px";
    folder.style.left = baseLeft + jitterX + "px";
  });

  // --- DRAGGING LOGIC ---
  let active = null;
  let offsetX = 0;
  let offsetY = 0;
  
  // NEW: Tracking variables for click vs drag
  let startX = 0;
  let startY = 0;
  const dragThreshold = 5; // Pixels to move before it's considered a drag

  folders.forEach(folder => {
    // We use "click" to handle the link, but we'll intercept it
    folder.addEventListener("click", e => {
      // Calculate how far the mouse moved since mousedown
      const movedX = Math.abs(e.clientX - startX);
      const movedY = Math.abs(e.clientY - startY);

      if (movedX > dragThreshold || movedY > dragThreshold) {
        // If it moved more than the threshold, stop the link from opening
        e.preventDefault();
        e.stopPropagation();
      }
    });

    folder.addEventListener("mousedown", e => {
      if (e.button !== 0) return;

      active = folder;
      
      // Store starting position to check against later
      startX = e.clientX;
      startY = e.clientY;

      const rect = folder.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      folder.classList.add("dragging");
      // Note: We removed e.preventDefault() here to allow the browser to register 
      // the click event properly, which we then filter above.
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

  document.addEventListener("mouseup", () => {
    if (active) {
      active.classList.remove("dragging");
      active = null;
    }
  });
});
