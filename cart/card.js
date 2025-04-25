const tabs = document.querySelectorAll(".tab");
const contentBoxes = document.querySelectorAll(".content-box");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Quitar clase activa de todos los tabs
    tabs.forEach(t => t.classList.remove("active"));
    // Ocultar todos los contenidos
    contentBoxes.forEach(box => box.classList.remove("active"));

    // Activar el seleccionado
    tab.classList.add("active");
    const selectedId = tab.getAttribute("data-tab");
    document.getElementById(selectedId).classList.add("active");
  });
});