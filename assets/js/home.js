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
