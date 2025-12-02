document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".scrap-img");

  images.forEach(img => {
    const randX = Math.random() * 60 + 10;
    const randY = Math.random() * 60 + 10;
    const randRot = Math.random() * 40 - 20;

    img.style.top = randY + "%";
    img.style.left = randX + "%";
    img.style.transform = `rotate(${randRot}deg)`;
  });
});
