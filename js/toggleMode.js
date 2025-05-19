window.addEventListener('DOMContentLoaded', () => {
  const isWhiteVersion = window.location.pathname.includes("versionwhite.html");

  if (isWhiteVersion) {
    // Ocultar video de fondo
    const video = document.querySelector("video");
    if (video) {
      video.style.display = "none";
    }

    // Ocultar imágenes específicas
    const imagesToHide = [
      "../pictures/fonditocard.jpg",
      "../pictures/fonditocard5.jpg",
      "../pictures/fonditocard4.jpg"
    ];

    document.querySelectorAll("img").forEach(img => {
      if (imagesToHide.includes(img.getAttribute("src"))) {
        img.style.display = "none";
      }
    });
  }
});