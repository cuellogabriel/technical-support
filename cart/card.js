document.addEventListener('DOMContentLoaded', function() {
  // --- LÓGICA DEL CARRUSEL DE SERVICIOS ---
  const carouselSection = document.getElementById('services-carousel-section');
  if (!carouselSection) return; 

  const serviceItems = carouselSection.querySelectorAll('.servicio-item');
  const navDots = carouselSection.querySelectorAll('.nav-dot');
  const btnDetalles = document.getElementById('btn-detalles-carousel');

  if (serviceItems.length === 0 || navDots.length === 0 || !btnDetalles) {
    return; 
  }

  let currentIndex = 0;
  let autoPlayInterval;

  function updateCarousel(newIndex, isAuto = false) {
    currentIndex = newIndex;

    serviceItems.forEach((item, index) => {
      if (index === currentIndex) {
        item.style.opacity = '1';
        item.style.transform = 'translateX(-50%) scale(1)';
        item.style.zIndex = '10';
        item.style.pointerEvents = 'auto';
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50%) scale(0.95)';
        item.style.zIndex = '5';
        item.style.pointerEvents = 'none';
      }
    });

    navDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    if (!isAuto) {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % serviceItems.length;
      updateCarousel(nextIndex, true);
    }, 4000);
  }

  navDots.forEach(dot => {
    dot.addEventListener('click', () => {
      updateCarousel(parseInt(dot.dataset.index));
    });
  });

  serviceItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (index !== currentIndex) {
        updateCarousel(index);
      }
    });
  });

  const modal = document.getElementById('modal-detalle');
  const cerrarModal = document.getElementById('cerrar-modal');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalDescripcion = document.getElementById('modal-descripcion');

  btnDetalles.addEventListener('click', () => {
    const servicioActivo = serviceItems[currentIndex];
    const titulo = servicioActivo.querySelector('h3').innerText;
    const descripcion = servicioActivo.getAttribute('data-detalle');

    modalTitulo.textContent = titulo;
    modalDescripcion.textContent = descripcion;
    modal.style.display = 'flex';
  });

  cerrarModal.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => e.target === modal ? modal.style.display = 'none' : null);

  updateCarousel(0);
  startAutoPlay();
});